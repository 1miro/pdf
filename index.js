import PDFDocument from 'pdfkit'
import fs from 'fs'
 
// Create a document
const doc = new PDFDocument();
 
// Saving the pdf file in root directory.
doc.pipe(fs.createWriteStream('with_color.pdf'));
 
// Adding functionality
doc.font('Helvetica'); // establishes the default font
doc.initForm();

doc.lineWidth(15);

//المربعات الي بالجوانب
doc.lineCap('butt')
   .moveTo(20, 20)
   .lineTo(35, 20)
   .stroke();

doc.lineCap('butt')
   .moveTo(580, 20)
   .lineTo(595, 20)
   .stroke();

doc.lineCap('butt')
   .moveTo(20, 770)
   .lineTo(35, 770)
   .stroke();

doc.lineCap('butt')
   .moveTo(580, 770)
   .lineTo(595, 770)
   .stroke();


doc.lineWidth(1);

//doc.text("name:",40,40);
doc.rect(80, 40, 200, 20).fillColor('yellow').fill();
   doc.stroke();

//doc.text("no:",40,70);
doc.rect(80, 70, 200, 20).fillColor('orange').fill();
   doc.stroke();

//doc.text("subject:",40,100);
doc.rect(80, 100, 200, 20).fillColor('purple').fill();
   doc.stroke();



//الخط الفاصل
doc.lineWidth(1);

doc.moveTo(0, 150)                               // set the current point
   .lineTo(610, 150)                            // draw a line
   .stroke();  
 
   //الاطار الخارجي
doc.rect(1,1,610,790);
   doc.stroke();

//doc.text("Q1:",10,160 );


//for bubbles

let radios=10
let num_question=20;
let num_question_for_each_line=3//عدد الاسئلة في كل سسطر تلاته واربع ولا كام
let num_question_for_each_row=(num_question/num_question_for_each_line)+(num_question%num_question_for_each_line);
let hight_of_rect=(num_question_for_each_row+2)*(radios*2+8)

doc.rect(30,160,500,hight_of_rect).fillColor('red').fill();//العرض محتاجه تظبطيه علي حسب مقاس الورقه برضو
   doc.stroke();

let constant_for_center_x=30;
let constant_for_center_y=160;
let center_x;//for each bubbles
let center_y;
let count=1;
let lst=["A","B","C","D"];

// //doc.fillColor('black');
// for (let k=1;k<=num_question_for_each_line;k++){//لوب علي عدد الالاعمده 
//     for (let i=1;i<=num_question_for_each_row+1;i++){//لوب علي الاسئلة الي في العمود

//       center_y=constant_for_center_y+(i*((radios*2+8)));
   
//        for (let j=1;j<=5;j++){//لرسم كل سؤال
//          //وخمسة هنا اعتبرت ان كل سوال ليه خمس اختيارات واخدتاو مكان ترقيم السوال
//         center_x=constant_for_center_x+(j*(radios*2+8));
//             if (i==1&&j!=1){
//                 doc.text(`${lst[j-2]}`,center_x, center_y-5);//زودت عدد الاسئله واجد في كل عمود عشان اعمل مكان السوال الاولاني اسم الاختيار

//             }
            
//             if (j==1&&i!=1){//لترقيم الاسئله
//                 doc.text(`${count}`,center_x, center_y-5);
//                 count++;

//             }
//             if (j!=1&&i!=1){//لرسم الدوائر بقي عادي
//                 doc.circle(center_x, center_y, radios);
//                 doc.stroke();
//             }
//        }
//        if (count-1==num_question)break; //الشرط ده عشان اخر عمود مش شرط يبقي كله مليان

//    }

//    constant_for_center_x+=(5*(radios*2+8)); //عشان الانتقال من العمود الاول للتاني 
// }

doc.moveTo(0, 160+hight_of_rect+10)                               // set the current point
   .lineTo(610, 160+hight_of_rect+10)                            // draw a line
   .stroke();  

let high_of_question=70;

//doc.text("Q2:",10,160+hight_of_rect+50);
doc.rect(30,160+hight_of_rect+50,500,high_of_question).fillColor('blue').fill();
   doc.stroke();

   
//doc.text("Q3:",10,160+hight_of_rect+high_of_question+100);
doc.rect(30,160+hight_of_rect+high_of_question+100,500,high_of_question).fillColor('green').fill();
      doc.stroke();

// Finalize PDF file
doc.end();