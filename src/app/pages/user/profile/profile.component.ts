import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { animate, style, transition, trigger } from '@angular/animations';
import '../../../../assets/charts/echart/echarts-all.js';
import { User, Program } from '../../../models';
import { first } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AlertService, AuthenticationService, UserService, ProgramService } from '../../../services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)' }),
        animate('400ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ProfileComponent implements OnInit {

  editProfileForm: FormGroup;
  addProgramForm: FormGroup;
  submitted = false;
  returnUrl: string;
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  password = new FormControl('', []);
  unit = new FormControl('', Validators.required);
  position = new FormControl('', Validators.required);
  title = new FormControl('');
  email = new FormControl('', [Validators.required, Validators.email]);
  rpassword = new FormControl('', [CustomValidators.equalTo(this.password)]);

  program = new FormControl('', Validators.required);

  editProfile = true;
  editProfileIcon = 'icofont-edit';

  editAbout = true;
  editAboutIcon = 'icofont-edit';
  name: String;
  programs: Program[] = [];



  profile: User;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private programService: ProgramService,
  ) {
  }

  ngOnInit() {

    this.name = localStorage.getItem('name');
    this.getProfile();
    this.loadAllPrograms();
    this.editProfileForm = new FormGroup({
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      unit: this.unit,
      title: this.title,
      position: this.position,
      rpassword: this.rpassword
    });
    this.addProgramForm = new FormGroup({
      program: this.program
    })
  }

  get f() { return this.editProfileForm.controls; }
  get programForm() { return this.addProgramForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editProfileForm.invalid) {
      return;
    }

    this.userService.editUser(this.profile.id, this.editProfileForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Edit profile successful', true);
          this.submitted = false;
          location.reload();
        },
        error => {
          this.alertService.error(error);
          this.submitted = false;
        });
  }

  private loadAllPrograms() {
    this.programService.getAllPrograms().subscribe(programs => {
      this.programs = programs;
    });
  }

  getProfile() {
    this.userService.getProfile().subscribe(user => {
      this.profile = user as User;
      this.firstName.setValue(this.profile.firstName);
      this.lastName.setValue(this.profile.lastName);
      this.email.setValue(this.profile.email);
      this.title.setValue(this.profile.title);
      this.unit.setValue(this.profile.unit);
      this.position.setValue(this.profile.position);
      this.password.setValue('');
      this.rpassword.setValue('');
    });
  }

  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
    this.submitted = false;
  }

  onDelete(pid: number) {
    this.userService.deleteUserProgram(Number(this.profile.id), pid).pipe().subscribe(data => {
      location.reload();
    }, error => {
      this.alertService.error(error);
      this.submitted = false;
    });
  }

  onAdd() {
    if (this.addProgramForm.invalid) {
      return;
    }

    this.userService.addUserProgram(Number(this.profile.id), this.program.value).pipe().subscribe(data => {
      location.reload();
    }, error => {
      this.alertService.error(error);
      this.submitted = false;
    });
  }
}
