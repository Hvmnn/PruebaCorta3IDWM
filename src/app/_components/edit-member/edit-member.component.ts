import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../../_services/member.service';
import { Member } from '../../_interfaces/member';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
})
export class EditMemberComponent implements OnInit {
  editMemberForm!: FormGroup;
  memberId!: string;
  member!: Member;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.memberId = this.route.snapshot.params['id'];

    this.editMemberForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      semester: [null, [Validators.required, Validators.min(1), Validators.max(10)]],
      career: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });

    this.memberService.getMemberById(this.memberId).subscribe(
      (response) => {
        this.member = response;
        this.editMemberForm.patchValue({
          name: this.member.name,
          email: this.member.email,
          semester: this.member.semester,
          career: this.member.career
        });
      },
      (error) => {
        console.error('Error al obtener el miembro', error);
      }
    );
  }

  onSubmit(): void {
    if (this.editMemberForm.invalid) {
      return;
    }

    this.memberService.updateMember(this.memberId, this.editMemberForm.value).subscribe(
      (response) => {
        console.log('Integrante editado correctamente', response);
        this.router.navigate(['/members', this.memberId]);
      },
      (error) => {
        console.error('Error al editar integrante', error);
      }
    );
  }

  get formControls() {
    return this.editMemberForm.controls;
  }
}
