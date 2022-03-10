import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SeoService } from '../services/seo.service';

// import {  } from "@material-workspace/services/seo";

@Component({
  selector: 'material-workspace-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  customers: any;

  constructor(private seo: SeoService, private db: AngularFirestore) {}

  ngOnInit() {
    this.seo.generateTags({
      title: 'Customer List',
      description: 'A list filled with customers'
    });

    this.customers = this.db.collection('customers').valueChanges({ idField: 'id' });

    // this.data.subscribeToCustomers();
  }
}
