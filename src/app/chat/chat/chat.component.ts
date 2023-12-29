import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { SignalRService } from '../../services/signalR-service/signalR.service';
import { MessageDataDto as MessageDataDto } from '../../shared/models/MessageDataDto';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [SignalRService],
})
export class ChatComponent implements OnInit {
  @ViewChild('messageToSend') messageToSend:ElementRef;
  private signalRService=inject(SignalRService);
  chat=this.signalRService.data;
  userId:string=localStorage.getItem('userId');
  userName:string=localStorage.getItem('userName');
  ngOnInit(): void {

    this.signalRService.startConnection();
    this.signalRService.receiveMessage();
  }
  submit(){
    let data ={
      fromId:this.userId,
      name:this.userName,
      message:this.messageToSend.nativeElement.value,
      date:new Date(),
      toId:crypto.randomUUID(),
      toName:'ahmed'
    } as MessageDataDto;
    this.signalRService.sendMessage(data);
    this.chat.value.push(data);
    this.messageToSend.nativeElement.value='';
  }
}
