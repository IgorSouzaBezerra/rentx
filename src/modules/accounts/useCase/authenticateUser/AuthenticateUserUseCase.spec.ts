import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AuthenticateUserUseCase } from "@modules/accounts/useCase/authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "@modules/accounts/useCase/createUser/CreateUserUseCase";
import { AppError } from "@shared/errors/AppError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123",
      email: "user@user.com",
      password: "1234",
      name: "User test",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexisting user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "false",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123",
      email: "user@user.com",
      password: "1234",
      name: "User test",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: "user@user.com",
        password: "incorrectPassword",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});
