import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ViewComponent } from './book-now/payment/view.component';
import { UpdateComponent } from './book-now/update/update.component';
import { GetallComponent } from './book-now/getall/getall.component';
import { PostComponent } from './book-now/post/post.component';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { DistrictComponent } from './tamilnadu/district/district.component';
import { BookingViewComponent } from './book-now/booking-view/booking-view.component';
import { AdminSigninComponent } from './admin/admin-signin/admin-signin.component';
import { AdminSignupComponent } from './admin/admin-signup/admin-signup.component';
import { ImageUploadComponent } from './admin/admin-dashboard/image-upload/image-upload.component';
import { AllBookingsComponent } from './admin/admin-dashboard/all-bookings/all-bookings.component';
import { AllPaymentsComponent } from './admin/admin-dashboard/all-payments/all-payments.component';
import { ImagesByLocationComponent } from './admin/admin-dashboard/images-by-location/images-by-location.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'admin-signin', component: AdminSigninComponent },
  { path: 'admin-signup', component: AdminSignupComponent },
  { path: 'image-upload', component: ImageUploadComponent },
  { path: 'all-bookings', component: AllBookingsComponent },
  { path: 'all-payments', component: AllPaymentsComponent },
  { path: 'images-by-location', component: ImagesByLocationComponent },
  { path: 'district', component: DistrictComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'view/:customId', component: ViewComponent },
  { path: 'update/:customId', component: UpdateComponent },
  { path: 'getall', component: GetallComponent },
  { path: 'post', component: PostComponent },
  { path: 'booking-view', component: BookingViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
