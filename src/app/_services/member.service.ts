import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_interfaces/member';
import { CreateMember } from '../_interfaces/create-member';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createMember(createMember: CreateMember): Observable<Member> {
    return this.http.post<Member>(this.baseUrl + '/member', createMember);
  }

  updateMember(id: string, member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.baseUrl}/member/${id}`, member);
  }

  getMemberById(id: string): Observable<Member> {
    return this.http.get<Member>(`${this.baseUrl}/member/${id}`);
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + '/member');
  }
}
