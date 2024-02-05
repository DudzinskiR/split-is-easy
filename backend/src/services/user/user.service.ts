import { UserExceptionFactory } from "src/exceptions";
import { UserModel, VirtualUserModel } from "src/models";
import { ID } from "src/types";

export class UserService {
  static async getUsername(userID: ID) {
    const user = await UserModel.findById(userID).exec();

    if (!user) {
      const virtualUser = await VirtualUserModel.findById(userID).exec();

      if (!virtualUser) {
        throw UserExceptionFactory.createUserNotFoundException(userID);
      }

      return { username: virtualUser.username };
    } else {
      return { username: user.username };
    }
  }
}
