import { IUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
  create({
    user_id,
    expires_date,
    refresh_token,
  }: IUserTokenDTO): Promise<UserTokens>;
}

export { IUsersTokensRepository };
