import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'http://localhost:7788';

  constructor(private http: HttpClient) {
  }

  private getHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // AUTH
  registerUser(registration: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/reg`, registration);
  }

  loginUser(loginDetails: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/login`, loginDetails);
  }

  // USERS
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/users/all`, {headers: this.getHeader()});
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/users/getLoggedInProfile`, {headers: this.getHeader()});
  }

  getUser(userId: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/users/getById/${userId}`, {headers: this.getHeader()});
  }

  getUserBookings(userId: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/users/getUserBooking/${userId}`, {headers: this.getHeader()});
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/users/delete/${userId}`, {headers: this.getHeader()});
  }

  // dress
  addDress(formData: any): Observable<any> {
    const headers = this.getHeader().set('Content-Type', 'multipart/form-data');
    return this.http.post(`${this.BASE_URL}/dress/add`, formData, {headers});
  }

  getAllAvailableDress(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/dress/allAvailableDresses`);
  }

  getAvailableDressByDateAndSize(rentalDate: string | null, returnDate: string | null, dressSize: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/dress/getAvailableDressByDateAndSize`);
  }

  getDressSizes(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/dress/sizes`);
  }

  getAllDress(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/dress/all`);
  }

  getDressById(dressId: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/dress/dressById/${dressId}`);
  }

  deleteDress(dressId: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/dress/delete/${dressId}`, {headers: this.getHeader()});
  }

  updateDress(dressId: string, formData: any): Observable<any> {
    const headers = this.getHeader().set('Content-Type', 'multipart/form-data');
    return this.http.put(`${this.BASE_URL}/dress/update/${dressId}`, formData, {headers});
  }

  // BOOKINGS
  bookDress(dressId: string, userId: string, booking: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/bookings/bookDress/${dressId}/${userId}`, booking, {headers: this.getHeader()});
  }

  getAllBookings(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/bookings/all`, {headers: this.getHeader()});
  }

  getBookingByConfirmationCode(bookingCode: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/bookings/getByConfirmCode/${bookingCode}`);
  }

  cancelBooking(bookingId: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/bookings/cancel/${bookingId}`, {headers: this.getHeader()});
  }

  // AUTHENTICATION CHECKER
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('token'); // Returns true if token is not present
    }
    return false;

    // return !localStorage.getItem('token');
  }

  isAdmin(): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('role') === 'ADMIN';
    }
    return false
  }

  isUser(): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('role') === 'USER';
    }
    return false;
  }
}
