import {gql} from '@apollo/client';

export const Login_User = gql`
  mutation ObtainJSONWebToken($password: String!, $email: String) {
    login(password: $password, email: $email) {
      token
      success
      errors
      user {
        id
        pk
        firstName
        lastName
        username
        email
        dob
        verified
        bio
        gender
        address
        phone
        isStaff
        isActive
        dateJoined
        timezone
        nationality
      }
      refreshToken
    }
  }
`;

export const ADD_User = gql`
  mutation RegisterUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $username: String!
    $password1: String!
    $password2: String!
  ) {
    register(
      email: $email
      firstName: $firstName
      lastName: $lastName
      username: $username
      password1: $password1
      password2: $password2
    ) {
      token
      success
      errors
      refreshToken
    }
  }
`;

export const SEND_PASSWORD_RESET = gql`
  mutation SendPasswordResetEmail($email: String!) {
    sendPasswordResetEmail(email: $email) {
      ok
      error
    }
  }
`;

export const VERIFY_ACCOUNT = gql`
  mutation VerifyAccount($code: String!) {
    verifyAccount(code: $code) {
      ok
      error
    }
  }
`;

export const VERIFY_RESET_PASSWORD_TOKEN = gql`
  mutation VerifyResetPasswordToken($code: String!) {
    verifyPasswordResetToken(code: $code) {
      ok
      error
    }
  }
`;

export const PASSWORD_RESET = gql`
  mutation PasswordReset(
    $token: String!
    $newPassword1: String!
    $newPassword2: String!
  ) {
    passwordReset(
      token: $token
      newPassword1: $newPassword1
      newPassword2: $newPassword2
    ) {
      success
      errors
    }
  }
`;

export const PASSWORD_CHANGE = gql`
  mutation PasswordChange(
    $oldPassword: String!
    $newPassword1: String!
    $newPassword2: String!
  ) {
    passwordChange(
      oldPassword: $oldPassword
      newPassword1: $newPassword1
      newPassword2: $newPassword2
    ) {
      token
      refreshToken
      success
      errors
    }
  }
`;
export const TAKE_EXCUSE = gql`
  mutation TakeExcuseMutation($eventId: Int, $excuse: String, $orgId: Int) {
    takeExcuse(eventId: $eventId, excuse: $excuse, orgId: $orgId) {
      success
      attendance {
        id
        present
        excuse
        excuseApproved
        excuseTime
        interested
      }
    }
  }
`;

export const ATTENDANCE = gql`
  mutation TakeAttendance($code: Int, $eventId: Int, $orgId: Int) {
    attendance(code: $code, eventId: $eventId, orgId: $orgId) {
      success
      attendance {
        id
        present
        interested
        excuse
        excuseApproved
        created
        updated
        meeting {
          id
          name
          description
          venue
          attendance
          code
        }
      }
    }
  }
`;

export const RESEND_ACTIVATION_CODE = gql`
  mutation ResendActivationEmail($email: String!) {
    resendActivationEmail(email: $email) {
      ok
      error
    }
  }
`;

export const JOIN_ORGANIZATION = gql`
  mutation JoinOrgMutation($orgId: ID!) {
    joinOrganization(orgId: $orgId) {
      request {
        organization {
          name
          abbrev
        }
        user {
          lastName
        }
        approved
      }
    }
  }
`;

export const LEAVE_ORGANIZATION = gql`
  mutation LeaveOrgMutation($orgId: ID!) {
    leaveOrganization(orgId: $orgId) {
      request {
        organization {
          name
          abbrev
        }
        user {
          lastName
        }
        approved
      }
    }
  }
`;

export const USERPHOTO = gql`
  mutation UserProfilePhoto($file: Upload!) {
    profilePicture(file: $file) {
      ok
      photoUrl
    }
  }
`;

export const UPDATE_ACCOUNT = gql`
  mutation UpdateAccount(
    $email: String
    $phone: String
    $firstName: String
    $lastName: String
    $dob: String
    $bio: String
    $gender: String
    $address: String
  ) {
    updateAccount(
      email: $email
      phone: $phone
      firstName: $firstName
      lastName: $lastName
      dob: $dob
      bio: $bio
      gender: $gender
      address: $address
    ) {
      success
      errors
    }
  }
`;

export const CHECK_IN = gql`
  mutation CheckInMemberForEvent(
    $eventId: Int!
    $orgId: Int!
    $userEmail: String
    $userId: Int
  ) {
    checkInMember(
      eventId: $eventId
      orgId: $orgId
      userEmail: $userEmail
      userId: $userId
    ) {
      success
      attendance {
        id
      }
    }
  }
`;

export const CHECK_OUT = gql`
  mutation CheckOutMemberForEvent(
    $eventId: Int!
    $orgId: Int!
    $userEmail: String
    $userId: Int
  ) {
    checkOutMember(
      eventId: $eventId
      orgId: $orgId
      userEmail: $userEmail
      userId: $userId
    ) {
      success
      attendance {
        id
      }
    }
  }
`;
