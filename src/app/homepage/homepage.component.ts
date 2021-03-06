import { Component, OnInit, Renderer2,ElementRef ,ViewChild } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  
  public searchText : string;
  nameinput:string;
  searchTerm: string;
  name:any;
  selectedValue:string;
  public queryJson:any;
  public fileJson:any;
  public comparedMatrix=[];
  isChecked:boolean=false;
  titleof;
  contentof;
  amountChecked=0;
  amountchecked=0;
  lastAction;
  
  found:boolean;
  url:string;
  textfilepath = environment.textfilepath;
  baseUrl = environment.baseUrl;
  path = environment.path;
 
  constructor( private _getData : GetDataService, private http : HttpClient ,private elRef: ElementRef, private renderer: Renderer2) {
    
   }
  updateSearch(e:any) {
    this.comparedMatrix=[];
    this.url = this.baseUrl ;
   this.name = e.target.value;
   this.searchTerm = e.target.value;
  // console.log(e.target.value);
   
   this._getData.getJson().subscribe(data => { 
    this.fileJson = data ;

   // for (let j = 0; j < this.link1.length; j++) {
   //   this.link3+=this.link1[j].kb_article_name;
  
   // }
   // console.log('hell',  data1);
 });
   this.http.post(this.url, {
     "_source": {
                 "includes": ["file.filename", "file.url", "_score" ]
             },
       "query": {
         "bool": {
           "must": [
             {
               "multi_match": {
           "fields":  [ "content"],
           "query":     this.name,
             "analyzer" : "synonym",
             "fuzziness": "auto",
           "slop": 5
             }
             }
           ],
           "should": [
             {
               "multi_match": {
           "fields":  [ "content"],
           "query":     this.name,
             "analyzer" : "no_synonym",
             "fuzziness": "auto",
           "slop": 5
             }
             }
           ]
     
         }
       },
       "highlight": {
           "order" : "score",
           "pre_tags" : ["<mark><b>"],
           "post_tags" : ["</b></mark>"],
           "fragment_size" : 150,
             "fields" : {
                 "content" : {}
             }
         }
     }
     
     
   )
   .subscribe(
     (data) => {
       this.queryJson = data;
    //   console.log('link',this.link);
    //  for (var i = 0; i < this.link.length; i++) {
    //  // this.link2 += this.link[i]['_source']['file']['filename'];
        
    //   }
    //   console.log('link2'+this.link2);
    this.startComparing();
      }
    
   ) 

   
  // 
  }

  startComparing(){

     //console.log(this.fileJson);
      //console.log(this.queryJson.hits.hits);
    //  console.log(this.queryJson.hits);
    let queryIndex = 0;

    for (let hit in this.queryJson.hits.hits) {

     

      for (let dataIndex = 0; dataIndex < this.fileJson.length; dataIndex++) {



        if(this.fileJson[dataIndex].kb_article_name == this.queryJson.hits.hits[hit]._source.file.filename){

          // console.log(this.fileJson[dataIndex].kb_article_name);
          // console.log(this.queryJson.hits.hits[hit]._source.file.filename);

          this.comparedMatrix.push([queryIndex, dataIndex]);
          queryIndex = queryIndex +  1;
          

        }

      }
      
    }
   

    //this.comparedMatrix.push([1, 2]);

    // console.log(this.queryJson.hits.hits[this.comparedMatrix[0][1]].highlight.content);
    //console.log(this.queryJson.hits.hits[this.comparedMatrix[0][1]]._score);
    //console.log(this.fileJson[this.comparedMatrix[0][1]].issue_article);
    //console.log(this.fileJson[this.comparedMatrix[0][1]].resolution_article);
    

  }

 checkedData(i,title,content)
 {
  // console.log(this.selectedValue);
  // console.log(title);
 //  console.log(content);
  
   this.titleof=title;
   this.contentof=content;
  // if(this.selectedValue==true)
  // {
   // this.amountChecked++;
    //console.log("amountchecked" +  this.amountChecked); 
    //if(this.amountChecked >=2 )
    //{
     // alert("amount checked twice");
      //this.renderer.removeClass(this.elRef.nativeElement,'pi-check');
      //this.renderer.removeClass(this.elRef.nativeElement,'ui-state-active');
    //  event=!event;
     // if(!event)
    //  {
        
      //  this.lab.nativeElement.classList.remove("pi-check");
      //  this.lab.nativeElement.classList.remove("ui-state-active");
     // }
      //else{
      //  this.lab.nativeElement.classList.add("pi-check");
      //  this.lab.nativeElement.classList.add("ui-state-active");
//}
      
     // console.log(this.renderer.removeClass('span','ui-state-active'));
     // event.target.class.remove('pi-check');
      //event.stopPropagation();
    
   // }
    
  //}
  //else{
   // this.amountChecked--;
    
  //}
 }
 /*isDisabled()
 {
   if(this.isChecked)
   {
     return true;
    
   }
  else
   {
     return false;
   }
 }*/
  displayData(title,content,i)
  {
   
    if(title==this.titleof)
    {
     
     console.log(title);
     console.log(content);
     
     
    }
    else
    {
      console.log("nothing is checked");
     
    }
  
  
 }
 
  
ngOnInit() {
    

  }
  

}
