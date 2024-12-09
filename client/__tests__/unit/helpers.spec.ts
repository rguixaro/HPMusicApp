import { trimTrackName } from '../../src/utils/helpers'

describe('trimTrackName', () => {
  test('removes [] and the content inside', () => {
    expect(trimTrackName('Track Name [Official Video]')).toBe('Track Name')
  })

  test('removes - Single', () => {
    expect(trimTrackName('Track Name - Single')).toBe('Track Name')
  })

  test('removes - EP', () => {
    expect(trimTrackName('Track Name - EP')).toBe('Track Name')
  })

  test('removes empty space', () => {
    expect(trimTrackName(' Track Name ')).toBe('Track Name')
  })

  test('does not return an empty string if the trimmed name is empty', () => {
    expect(trimTrackName('[Official Video]')).toBe('[Official Video]')
  })
})
