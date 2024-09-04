import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UsersService, LoginInfo } from '../users/users.service';
import { UserCredential } from '@angular/fire/auth';

export interface Register {
  uid: string;
  email: string;
  nickname: string;
  photoUrl: string;
  phoneNumber: string;
  role: string;
}
@Injectable({
  providedIn: 'root',
})
export class RegistersService {
  constructor(
    private firestore: Firestore,
    private usersService: UsersService
  ) {}

  getRegister(): Observable<Register[]> {
    const RegisterRef = collection(this.firestore, 'registers');
    return collectionData(RegisterRef, { idField: 'id' }) as Observable<
      Register[]
    >;
  }

  async createRegister(loginInfo: LoginInfo, register: Register): Promise<any> {
    console.log(loginInfo);
    console.log(register);    
    let userCredential: UserCredential = await this.usersService
      .register(loginInfo)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    console.log(userCredential);
    register.uid = userCredential.user.uid;
    const RegisterRef = collection(this.firestore, 'registers');
    return addDoc(RegisterRef, register);
  }

  updateRegister({
    uid,
    nickname,
    photoUrl,
    phoneNumber,
    role,
  }: Register): Promise<any> {
    const docRef = doc(this.firestore, `registers/${uid}`);
    return updateDoc(docRef, {
      uid,
      nickname,
      photoUrl,
      phoneNumber,
      role,
    });
  }
  async deleteRegister(register: Register): Promise<any> {
    await this.usersService.deleteRegister(register.uid);
    const docRef = doc(this.firestore, `registers/${register.uid}`);
    return deleteDoc(docRef);
  }
}
