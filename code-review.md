# HP Technical Challenge Review

**Task 2: Analysis Challenge**

First, when using the MongoDB node driver, the _findOneAndUpdate_ function does not
accept a callback as the 4th parameter. It should instead use await/.exec() and then
check for the response. Besides, using exec() will provide more details in the stack
trace should an error occur.

The same happens again when using _Shop.findOne(shopId).exec(function (err,
shop)...)_, as _exec()_ no longer accepts a callback.

Regarding the business logic, it doesn't make any sense that when a shop already
contains a certain invitation, we add it again to the array. This operation would
make sense if the invitation was not already saved. It's also an error to store the
user into the _shop.users_ array, which should just contain ids.

A couple of safety checks could be added in order to prevent accessing undefined
values (_req.params.shopId_ and _req.boy.email_). Furthermore, when we use the
_.end()_ function of the superuser package, we are not checking if there's an error,
even though we have the exact property to control it.

In my refactor I've tried to distribute various independent parts of the code into
separate functions. This will make it both easier to read and to test. I've also
tried to remove some nested callbacks that were making the code really difficult to
understand.

```markdown
/\*\*

-   Update or create a user in the database
-   @param {string} authId
-   @param {string} email
-   @returns {Promise<{user: Object}>} or throws error \*/ async function
    updateOrCreateUser(authId, email) { try { const user = await
    User.findOneAndUpdate( { authId }, { authId, email }, { upsert: true, new: true }
    ); return { user }; } catch (err) { throw new Error('Error creating or updating
    user'); } }

/\*\*

-   Find a shop by id and update it with the invitation id and user id
-   @param {string} shopId
-   @param {string} invitationId
-   @param {string} userId
-   @returns {Promise<void>} or throws error \*/ async function
    findAndUpdateShop(shopId, invitationId, userId) { try { const shop = await
    Shop.findById(shopId).exec(); if (!shop) throw new Error('No shop found'); if
    (shop.invitations.indexOf(invitationId) === -1)
    shop.invitations.push(invitationId); if (shop.users.indexOf(userId) === -1)
    shop.users.push(userId); await shop.save(); } catch (err) { throw new
    Error('Error finding or updating shop'); } }

/\*\*

-   Tries to send an invitation with superagent
-   @param {string} authUrl
-   @param {object} invitationBody
-   @returns {Promise<{response: Object}>} or throws error \*/ async function
    sendInvitation(authUrl, invitationBody) { return new Promise((resolve, reject) =>
    { superagent .post(authUrl) .send(invitationBody) .end((err, response) => { if
    (err) { reject(err); } else { resolve(response); } }); }); }

async function inviteUser(req, res) { const invitationBody = req.body; const shopId =
req.params?.shopId; if (!shopId || !invitationBody?.email) { return
res.status(400).json({ error: true, message: 'Missing parameters' }); } const authUrl
= 'https://url.to.auth.system.com/invitation'; try { const invitationResponse = await
sendInvitation(authUrl, invitationBody); if (err) { return res .status(500) .json({
error: true, message: 'Error sending invitation' }); }

    	if (!invitationResponse || !invitationResponse.body) {
    		return res.status(500).send({
    			message: 'Invalid response from invitation system',
    		});
    	}

    	if (invitationResponse.status === 201) {
    		const { authId, email, invitationId } = invitationResponse.body;

    		const { user } = await updateOrCreateUser(authId, email);
    		await findAndUpdateShop(shopId, invitationId, user._id);

    		return res.json({
    			message: 'Invitation sent',
    			data: invitationResponse,
    		});
    	} else if (invitationResponse.status === 200) {
    		return res.status(400).json({
    			error: true,
    			message: 'User already invited to this shop',
    		});
    	}
    	return res.json(invitationResponse);
    } catch (error) {
    	return res.status(500).json({ error: true, message: error.message });
    }

}
```
