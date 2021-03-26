import 'reflect-metadata';
import {HomePage} from "../pages/home/home";

/**
 * Block level variable for assigning the HomePage service to
 *
 */
let calculator: HomePage;

const platform = jest.mock('Platform');
const navController = jest.mock('NavController');

/**
 * Re-create the HomePage class object before each
 * unit test is run
 *
 */
beforeEach(() => {
  calculator = new HomePage(platform, navController);
});

/**
 * Group the unit tests for the calculator into one
 * test suite
 *
 */
describe('Calculations service', () =>
{
  /**
   * Test that the returned value matches the set value
   *
   */
  test('Sets the current value', () =>
  {
    expect.assertions(2);

    calculator.touchDigit({srcElement: { innerText: "4" } });

    let displayValue = calculator.displayValue,
      currentValue = calculator.currentValue;

    expect(displayValue).toEqual("4");
    expect(currentValue).toEqual(4);
  });
});
