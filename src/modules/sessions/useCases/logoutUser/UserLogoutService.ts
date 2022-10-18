import { UserLogoutDTO } from '../../../../database/dtos/dtos';
import { TokensRepository } from '../../../../database/repositories/TokensRepository';

class UserLogoutService {
  async execute({ userId }: UserLogoutDTO): Promise<void> {
    const tokensRepository = new TokensRepository();

    await tokensRepository.delete({ userId });
  }
}

export { UserLogoutService };
