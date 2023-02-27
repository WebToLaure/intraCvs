/**
 *  @class UserRoleEnum
 * 
 * Class permettant de définir les toirs rôles de l'application :
 * 
 * * ADMIN rôle suprême en droit
 * * CONSULTANT rôle de consultation profil (GET All / Id)
 * * USER rôle simple création de CV 
 */

export enum UserRoleEnum{

    ADMIN ='admin',
    CONSULTANT = 'consultant',
    USER = 'user'
}