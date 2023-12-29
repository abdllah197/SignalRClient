import { Injectable } from '@angular/core';
import * as SignalR from "@microsoft/signalr"
import { MessageDataDto
   as MessageDataDto } from '../../shared/models/MessageDataDto';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class SignalRService {
  data=new BehaviorSubject<MessageDataDto[]>([]);
  constructor() {}
  private hubConnection:signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new SignalR.HubConnectionBuilder()
                                .withUrl('http://localhost:5168/message')
                                .withAutomaticReconnect()
                                .build();
        this.hubConnection
          .start()
          .then(() => console.log('Connection started'))
          .catch(err => console.log('Error while starting connection: ' + err))
  }
  public receiveMessage = () => {
    this.hubConnection.on('ReceiveMessage', (data: MessageDataDto) => {
      console.log(data);
      this.data.value.push(data);
    });
  }
  public sendMessage = (data:MessageDataDto) => {
    this.hubConnection.send('ReceiveMessage', data);
  }
  public setGroup = (name:string) => {
    this.hubConnection.send('SetGroup', name);
  }

}
