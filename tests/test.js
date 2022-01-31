const Clicks = require('../clicks.js')
const {dataInput, dataOutput} = require('./test_data.js')

test('Check manipulation results', () => {  
  let result = Clicks.manipulateDataset(dataInput)
  expect(result.length).toEqual(dataOutput.length);
});

test('Check empty dataset', () => {  
  let result = Clicks.manipulateDataset([])
  expect(result).toStrictEqual([]);
});

test('Invalid arguments', () => {    
  expect(() => Clicks.manipulateDataset({a : '123'})).toThrow(Error);
});