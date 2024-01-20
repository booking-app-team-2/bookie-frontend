import { Component } from '@angular/core';
import {NotificationDTO} from "./model/notification";
import {ProfileService} from "../../profiles/profile.service";
import {MatDialog} from "@angular/material/dialog";
import {SharedService} from "../../shared/shared.service";
import {TokenService} from "../../shared/token.service";
import {NotificationsService} from "../notifications.service";

@Component({
  selector: 'app-notifications-screen',
  templateUrl: './notifications-screen.component.html',
  styleUrl: './notifications-screen.component.scss'
})
export class NotificationsScreenComponent {
  notifications: NotificationDTO[] = [];
  userId: number = this.tokenService.getIdFromToken() ?? 0;

  constructor(private tokenService: TokenService,
              private notificationService: NotificationsService) { }

  ngOnInit() {
    this.notificationService.getNotifications(this.userId).subscribe({
      next: (notifications: NotificationDTO[]): void => {
        this.notifications = notifications;
      },
      error: () => {
      }
    });

  }
}
