import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public show : boolean = false;
  public searchText : string;
  nameinput:string;
  searchTerm: string;
  name:any;
  link:any=[];
  found:boolean;
  url:string;
  constructor(private http : HttpClient) { }
  updateSearch(e:any) {
    this.url = "http://10.11.198.208:9200/investopedia/_doc/_search?pretty";
   this.name = e.target.value;
   this.searchTerm = e.target.value;
   console.log(e.target.value);
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
       this.link = data['hits']['hits'];
       console.log(this.link);
        
       }
       
       
   
    
   ) 
  
  }

  ngOnInit() {
    //this._getData.getJson().subscribe(data => this.link = data);
  }
  

}
