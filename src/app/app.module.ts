import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE,  } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { vehiclesService } from './services/vehicles.service';
import { PointInterestService } from './services/point-interest.service';
import { AmountTimeTableComponent } from './home/components/amount-time-table/amount-time-table.component';
import { ConvertDatePipe } from './pipe/convert-date.pipe';
import { FormsModule } from '@angular/forms';
import { FormatPeriodPipe } from './pipe/format-period.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AmountTimeTableComponent,
    ConvertDatePipe,
    FormatPeriodPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    MatExpansionModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    vehiclesService,
    PointInterestService,
    ConvertDatePipe,
    FormatPeriodPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
