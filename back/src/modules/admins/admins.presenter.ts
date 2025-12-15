import { AdminModel } from './admins.model';

export class AdminPresenter {
  id: string;
  mail: string;
  password: string;
  firstName: string;
  lastName: string;
  isSuperAdmin: boolean;

  private constructor(data: AdminPresenter) {
    Object.assign(this, data);
  }

  public static from(data: AdminModel) {
    return new AdminPresenter({
      id: data.id,
      mail: data.mail,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      isSuperAdmin: data.isSuperAdmin,
    });
  }

  
}
