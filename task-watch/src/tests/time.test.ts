import {Time} from '../models/time'

test('should add 5 seconds', () => {
  const time = new Time()
  time.addSeconds(5) 
  expect(time).toEqual({seconds: 5, minutes: 0, hours: 0})
})
