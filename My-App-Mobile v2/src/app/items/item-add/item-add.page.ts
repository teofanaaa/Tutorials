import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Item} from '../item';
import {ItemService} from '../items.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.page.html',
  styleUrls: ['./item-add.page.scss'],
})
export class ItemAddPage implements OnInit, OnDestroy {
  @Input() item: Item;
  private subscriptions = [];
  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit() {
    this.item = new Item();
  }

  addItem($event) {
    this.subscriptions.push(this.itemService.save(this.item).subscribe(
        item => {
          this.item = item;
        },
        error => {
          console.log(error);
        }));
    this.router.navigate(['//items']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subcription => subcription.unsubscribe());
  }

}
