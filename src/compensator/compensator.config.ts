import {registerAs} from '@nestjs/config';

export default registerAs('compensator', () => ({
  url: process.env.COMPENSATOR_URL!,
}));
