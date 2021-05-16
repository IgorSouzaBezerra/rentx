import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/provider/DateProvider/implementations/DayJsDateProvider";
import { MailProviderInMemory } from "@shared/container/provider/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let mailProvider: MailProviderInMemory;

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "121313",
      email: "zamrodiw@dom.tr",
      name: "Floyd Burns",
      password: "12345",
    });

    await sendForgotPasswordMailUseCase.execute("zamrodiw@dom.tr");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("be@pa.mh")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create  an users token", async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "245",
      email: "ni@ocefim.at",
      name: "Rosa Mack",
      password: "12345",
    });

    await sendForgotPasswordMailUseCase.execute("ni@ocefim.at");

    expect(generateTokenMail).toBeCalled();
  });
});
