import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
@Injectable({
  providedIn: 'root'
})

export class CrudService {

  constructor(public fireservices:AngularFirestore) { }

  create_new_data(Record)
  {
    return this.fireservices.collection('Data').add(Record);
  }
  create_new_d(Record)
  {
    return this.fireservices.collection('item').add(Record);
  }

  get_all_data()
  {
    return this.fireservices.collection('Data').snapshotChanges();
  }
  
  update_data(updated_record, record)
  {
    this.fireservices.doc('Data/' + updated_record).update(record);
  }

  delete_data(record_id)
  {
    this.fireservices.doc('Data/' + record_id).delete();
  }
}
