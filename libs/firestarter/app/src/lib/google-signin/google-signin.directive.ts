import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Directive({
  selector: '[materialWorkspaceGoogleSignin]',
})
export class GoogleSigninDirective {
  constructor(private afAuth: AngularFireAuth) {}

  @HostListener('click')
  onClick() {
    console.log('hola');
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}