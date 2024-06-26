import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from '../../_services/member.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
})
export class AddMemberComponent implements OnInit {
  addMemberForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private memberService: MemberService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addMemberForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      semester: [null, [Validators.required, Validators.min(1), Validators.max(10)]],
      career: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  onSubmit(): void {
    if (this.addMemberForm.invalid) {
      return;
    }

    this.memberService.createMember(this.addMemberForm.value).subscribe(
      (response) => {
        console.log('Integrante agregado correctamente', response);
        this.router.navigate(['/members']);
      },
      (error) => {
        console.error('Error al agregar integrante', error);
      }
    );
  }

  get formControls() {
    return this.addMemberForm.controls;
  }
}
