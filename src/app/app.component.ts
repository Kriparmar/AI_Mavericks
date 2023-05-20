import { Component } from '@angular/core';
import { OpenaiService } from './openai.service';
import { Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

interface Person {
  id: number;
  name: string;
  email: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})


export class AppComponent {
  public textlist: string = "";
  public resource: any = {};
  public discontinueReasons: any;
  public selectedReason: any;
  public discontinueDetails: any;
  showWhatsAppIcons: boolean = false;
  textareaContent: string = '';
  showMentions: boolean = false;
  mentions: Person[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    // Add more sample data as needed
  ];

  constructor(private openaiService: OpenaiService) {}

  generateText(data:string) {
    // this.openaiService.generateText(data.text + 'generate feedback in 4-5 lines').then(text => {
    //   data.response = text;
    //   if(this.textList.length===data.sno){
    //     this.textList.push({sno:1,text:'',response:''});
    //   }
    // });
  }

  toggleWhatsAppIcons(): void {
    this.showWhatsAppIcons = !this.showWhatsAppIcons;
  }

  handleInput(event: Event): void {
    const text = (event.target as HTMLTextAreaElement).value;
    const lastWord = text.split(' ').pop();
    if (lastWord?.startsWith('@')) {
      this.showMentions = true;
    } else {
      this.showMentions = false;
    }
  }

  selectMention(mention: Person): void {
    this.textareaContent += ` @${mention.name} `;
    this.showMentions = false;
  }
}

