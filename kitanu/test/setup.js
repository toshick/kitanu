import '@/plugins/global';
import '@/plugins/v-longpress';

jest.mock('vee-validate/dist/rules', () => {
  return {
    alpha_dash: {
      validate: jest.fn(),
    },
    required: {
      validate: jest.fn(),
    },
    email: {
      validate: jest.fn(),
    },
    is: {
      validate: jest.fn(),
    },
    numeric: {
      validate: jest.fn(),
    },
    max_value: {
      validate: jest.fn(),
    },
    min_value: {
      validate: jest.fn(),
    },
    length: {
      validate: jest.fn(),
    },
  };
});
