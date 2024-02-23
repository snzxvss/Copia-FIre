export interface User {
  userId: number;
  userEmail: string;
  userState: boolean;
  userPassword?: string;
  userUsername: string;
  userImage: string;
  userLastName: string;
  userFirstName: string;
  userCreationDate: Date;
  userAddress: {
    cityName: string;
    stateName: string;
    addressBorough: string
    zipCode: string
    streetName: string
    accommodationType: string
  },
  userPhoneNumber: string;
  agentCofNumber: string;
  userPermissions: {
    taskPermission: boolean;
    userPermission: boolean;
    clientPermission: boolean;
    auditLogPermission: boolean;
    reportTaskPermission: boolean;
    organizationPermission: boolean;
  };
  userRequirePasswordChange: boolean;
}
