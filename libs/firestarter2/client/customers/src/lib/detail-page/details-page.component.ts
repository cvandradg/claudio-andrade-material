import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'material-workspace-details-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent {
  customerId: any = '';
  customer: Observable<any> | undefined;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private seo: SeoService
  ) // public data: CustomerDataService
  {}

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('id');

    this.customer = this.db
      .collection('customers')
      .doc<any>(this.customerId)
      .valueChanges();
    // this.customer = this.data.getCustomer(this.customerId)
    //   .pipe(
    //     tap((cust:any) =>
    //       this.seo.generateTags({
    //         title: cust.name,
    //         description: cust.bio,
    //         image: cust.image,
    //       })
    //     )
    //   );
  }
}
