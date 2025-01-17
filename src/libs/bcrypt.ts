import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const encrypt = async (password: string, salt = saltOrRounds) => {
  return await bcrypt.hash(password, salt);
};

export const compare = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};


