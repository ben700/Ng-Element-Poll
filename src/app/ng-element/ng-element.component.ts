import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// import for our mock database
import {
  AngularFirestoreDocument,
  AngularFirestore
} from 'angularfire2/firestore';

@Component({
  selector: 'app-ng-element',
  templateUrl: './ng-element.component.html',
  styleUrls: ['./ng-element.component.scss'],
  // this will enable us to port the implemented bootstrap design
  // for our component
  encapsulation: ViewEncapsulation.Native
})
export class NgElementComponent implements OnInit {
  // variables for the poll
  ngVote: number;
  vueVote: number;
  reactVote: number;

  // checkers for our poll, given default false value
  hasVoted = false;
  loading = false;

  // reference to the mock database
  dbRef: AngularFirestoreDocument<any>;

  // this will serve as a service for our mock database
  constructor(private dbService: AngularFirestore) {}

  ngOnInit() {
    // retrieve our mock database
    this.dbRef = this.dbService.doc('first_poll/1');
    // subscribe to db changes, if changes, then execute callback
    this.dbRef.valueChanges().subscribe(doc => {
      this.ngVote = doc.angular_vote;
      this.vueVote = doc.vue_vote;
      this.reactVote = doc.react_vote;
    });
  }

  // add voting function
  vote(userVote: string) {
    // change loading value to true to change view
    this.loading = true;
    // run the database transaction, 2 args
    // 1st arg is the the functio name, 2nd is the get function or the transaction itself
    this.dbService.firestore
      .runTransaction(transact => {
        return transact.get(this.dbRef.ref).then(doc => {
          const newVoteCount = doc.data()[userVote] + 1;
          // update
          transact.update(this.dbRef.ref, { [userVote]: newVoteCount });
        });
      })
      // if successful, set data of the hasVoted and loading for view changes
      // and log something to confirm voting success, logging is optional
      .then(() => {
        this.hasVoted = true;
        this.loading = false;
        console.log('Vote Submitted!');
      })
      // this is good practice, add an error message if something fails.
      .catch(err => console.log('Voting Failed, ' + err));
  }

  // get voting percentage per each choices
  get ngVotePercent() {
    // return percentage value by adding the total vote count of all choices
    // then divide by the choice vote count and finally multiply by 100
    return (this.ngVote / (this.ngVote + this.vueVote + this.vueVote)) * 100;
  }

  get vueVotePercent() {
    return (this.vueVote / (this.ngVote + this.vueVote + this.vueVote)) * 100;
  }
  get reactVotePercent() {
    return (this.reactVote / (this.ngVote + this.vueVote + this.vueVote)) * 100;
  }
}
