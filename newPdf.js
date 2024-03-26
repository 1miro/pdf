import PDFDocument from 'pdfkit'
import fs from 'fs'

// Create a document
const doc = new PDFDocument({size: 'A4'});
 
// Saving the pdf file in root directory.
doc.pipe(fs.createWriteStream('newPDF.pdf'));
 
// Adding functionality
doc.font('Helvetica'); // establishes the default font
doc.initForm();


const high_of_A4=841.89;
const width_of_A4=595.28;
let margin=15;
//حدود ال pdf كله
doc.rect(margin,margin,width_of_A4-margin*2,high_of_A4-margin*2);
   doc.stroke();


//المربعات الي في الجنب 
doc.lineWidth(10);

doc.lineCap('butt')
   .moveTo(5, margin)
   .lineTo(margin, margin)
   .stroke();

doc.lineCap('butt')
   .moveTo(5, high_of_A4-margin)
   .lineTo(margin, high_of_A4-margin)
   .stroke();

doc.lineCap('butt')
   .moveTo(width_of_A4-margin, margin)
   .lineTo(width_of_A4-5, margin)
   .stroke();

doc.lineCap('butt')
   .moveTo(width_of_A4-margin, high_of_A4-margin)
   .lineTo(width_of_A4-5, high_of_A4-margin)
   .stroke();

let end_of_sections=[0];

    doc.lineWidth(1);

    doc.text("name:",40,40);
    doc.rect(100, 40, 200, 20);//.fillColor('yellow').fill();
        doc.stroke();

    doc.text("Semester :",40,70);
    doc.rect(100, 70, 200, 20);//.fillColor('orange').fill();
        doc.stroke();

    doc.text("subject:",40,100);
    doc.rect(100, 100, 200, 20);//.fillColor('purple').fill();
        doc.stroke();

    doc.text("subject:",40,130);
    doc.rect(100, 130, 200, 20);//.fillColor('purple').fill();
        doc.stroke();

    doc.moveTo(margin, 160)                               // set the current point
        .lineTo(width_of_A4-margin, 160)                            // draw a line
        .stroke();  

    end_of_sections.push(160);

//////////////////////////////////////////////////////////////////////////////////////////////////////////
let perivious_element=end_of_sections[end_of_sections.length-1];

    doc.text("full circle fully",50,perivious_element+20);
    doc.text("use dark pen or pencel:",140,perivious_element+20);
    doc.text("do not fold sheet:",280,perivious_element+20);
    doc.text("comletely earse mistakes:",380,perivious_element+20);

    doc.moveTo(margin, perivious_element+50)                               // set the current point
        .lineTo(width_of_A4-margin, perivious_element+50)                            // draw a line
        .stroke(); 
    end_of_sections.push(perivious_element+50);


console.log(end_of_sections)
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//MSQ
perivious_element=end_of_sections[end_of_sections.length-1];
doc.text("question1",280,perivious_element+(margin/2));

let radios=10.4
let num_question=150;
let num_question_for_each_line=4;
let distance_btn_circle=3.47;
let num_question_for_each_colum=Math.floor(num_question/num_question_for_each_line);
if (num_question%num_question_for_each_line!=0){
    num_question_for_each_colum++;
}
let lst_MSQ=["A","B","C","D"];
let lst_TF=["T","F"];

function draw_123(num_q_for_this_rect,num_question_for_each_colum_of_this_rect,start_of_this_rect,start_of_counting){
     let count=1;
     let i;
     let x=1;
     let const_center_x=0;
     let center_x;
     while(x<=num_question_for_each_line){
        for (i=1;i<=num_question_for_each_colum_of_this_rect&&count<=num_q_for_this_rect;i++){
            center_x=const_center_x+(margin*2)+(3*radios);
            let center_y=start_of_this_rect+(i*(radios*2+distance_btn_circle));
            doc.text(`${count+start_of_counting}`,count+start_of_counting < 100 ? center_x : center_x - 7, center_y-5);
            count++;
        }
        const_center_x+=(10*radios)+(4*distance_btn_circle);//هننغير في حاله الصح والغلط
        x++;
     }
}

function draw_ABCD(start_of_this_rect){
    let center_y=start_of_this_rect+distance_btn_circle;
    let center_x=(margin*2)+(2*distance_btn_circle)+(radios*4);
    for (let i=1;i<=num_question_for_each_line;i++){
        for (let j=0;j<lst_MSQ.length;j++){
            doc.text(`${lst_MSQ[j]}`,center_x,center_y);
            center_x+=(radios*2)+distance_btn_circle;
        }
        center_x+=(radios*2);
    }

}
doc.lineWidth(1);

function draw_circles( num_circles,num_q_for_this_rect,num_question_for_each_colum_of_this_rect,start_of_this_rect){
    let x=1;
    let count=1;
    let i;
    let const_center_y=start_of_this_rect+(radios*2+distance_btn_circle);
    let center_y=0;
    let center_x=0;
    let const_center_x=(margin*2)+(5*radios)+distance_btn_circle
    while(x<=num_question_for_each_line){
        for (i=0;i<num_question_for_each_colum_of_this_rect&&count<=num_q_for_this_rect;i++){
            center_y=const_center_y+i*((2*radios)+distance_btn_circle)
            for(let j=0;j<num_circles;j++){
                center_x=const_center_x+j*((2*radios)+distance_btn_circle)
                doc.circle(center_x, center_y, radios);
                doc.stroke();           
             }

            count++;
        }
        const_center_x=center_x+(4*radios)+distance_btn_circle;

        x++;

     }

}

function draw_MSQ( num_q_for_this_rect,num_question_for_each_colum_of_this_rect,start_of_this_rect,start_of_counting){
    draw_123(num_q_for_this_rect,num_question_for_each_colum_of_this_rect,start_of_this_rect,start_of_counting);
    draw_ABCD(start_of_this_rect);
    draw_circles(4,num_q_for_this_rect,num_question_for_each_colum_of_this_rect,start_of_this_rect);

}
const start_of_rec=perivious_element+(margin*2);
let hight_of_rect=((num_question_for_each_colum+1)*(radios*2))+((num_question_for_each_colum+1)*distance_btn_circle);

if (hight_of_rect<= (high_of_A4-(margin*2)-start_of_rec)){
    doc.rect(margin*2, start_of_rec, width_of_A4-margin*4, hight_of_rect);//.fillColor('purple').fill();
        doc.stroke();
        draw_MSQ(num_question,num_question_for_each_colum,0);
}
else{
    ////fist rect
    let higt_of_first_rect=(high_of_A4-(margin*2)-start_of_rec);

    let start_of_first_rect=start_of_rec;

    let num_ques_for_each_colum_of_first_rect=Math.floor(higt_of_first_rect/(2*radios+distance_btn_circle))-2;
    let num_ques_for_first_rect=num_ques_for_each_colum_of_first_rect*num_question_for_each_line;
    doc.rect(margin*2, start_of_first_rect, width_of_A4-margin*4, higt_of_first_rect);//.fillColor('purple').fill();
    doc.stroke();
    console.log(num_ques_for_each_colum_of_first_rect)
    draw_MSQ(num_ques_for_first_rect,num_ques_for_each_colum_of_first_rect,start_of_first_rect,0);


    //second rect 
    let start_of_second_rect =2*margin;
    let num_ques_for_second_rect=num_question-num_ques_for_first_rect;
    let num_ques_for_each_colum_of_second_rect=Math.floor(num_ques_for_second_rect/num_question_for_each_line);
    if (num_ques_for_second_rect%num_question_for_each_line!=0){
        num_ques_for_each_colum_of_second_rect++;
    }
    let higt_of_second_rect=((num_ques_for_each_colum_of_second_rect+1)*(radios*2))+((num_ques_for_each_colum_of_second_rect+1)*distance_btn_circle);

    doc.addPage({size: 'A4'});
    end_of_sections.push(0);
    

    doc.rect(margin*2, 30, width_of_A4-margin*4, higt_of_second_rect);//.fillColor('purple').fill();
    doc.stroke();
    draw_MSQ(num_ques_for_second_rect,num_ques_for_each_colum_of_second_rect,start_of_second_rect,num_ques_for_first_rect);
    end_of_sections.push(higt_of_second_rect+margin*2);



}










// Finalize PDF file
doc.end();