/**
 * Created by Алёна on 12.01.14.
 */
function main(){
//Глобальные переменные
    str =document.getElementById('text');
    text = new String();
    changeText=document.getElementById('changeText');
    array = new Array();//Массив запоминает количество слов
    //Массив содержит в себе служебные слова
    soyz = new Array("а","но","да","А","Но","Да");
    m =0;k=0;
    bool = false;
    /*Массив с гласными символами*/
    vowels = new Array("а","о","э","и","у","ы","е","ё","ю","я",
        "А","О","Э","И","У","Ы","Е","Ё","Ю","Я");

    //массив символов если пробел до символа и после, чтобы не считать символ за слово
    znak = new Array(' ','.',',',':',';','!','?','\'','"');

    //массив приставок
    pristavka= new Array('под','без','бес','в','во','вз','взо','вс','вне','воз','возо','вос','вы','до','за',
        'из','изо','ис','испод','кое','над','надо','наи','недо','не','небез','небес','ни','низ','низо',
        'нис','о','об','обо','обез','обес','около','от','ото','па','пере','по','под',
        'подо','поза','после','пра','пре','пред','предо','преди','при','про',
        'противо','раз','разо','рас','роз','рос','с','со',
        'сверх','среди','су','сыз','тре','у','чрез','через','черес','а','анти','архи',
        'би','вице','гипер','де','дез','дис','им','интер','ир','квази','контр','макро',
        'микро','обер','пост','пре','прото','псевдо',
        'ре','суб','супер','транс','ультра','экзо','экс','экстра');
}


//Функция для подсчета количества слов в тексте
function kolSlov(str2){
    console.time('test');
    array.length =0;
    for(i=0;i<str2.length;i++){
        /*Если элемент строки является пробелом или числом - пропускаю итерацию*/
        if(str2[i]==' ' || isNaN(str2[i])==false){
            continue;
        }

        for(j=i;j<str2.length;j++){
            if(str2[j]==' ' || j==(str2.length-1)){
                array[m]=str2.substring(i,(j+1));
                array[m] = array[m].trim(" ");
                i=j;

                bool=false;
                for(k=0;k<soyz.length;k++){
                    if(array[m]==soyz[k]){
                        bool = true;
                        /*Если элемент массива оказался служебным словом,
                         * удаляю элемент из массива*/
                        array.pop();
                        break;
                    }

                }
                /*bool=false если элемент не является служебным словом*/
                if(bool==false) {m++;break;}


            }
        }
    }
    console.timeEnd('test');

}
/*-----------------------Конец функции подсчета количества слов---------------------------*/


/*-----------------------Функция нахождения гласных букв-----------------------------------*/
function glasBukv(str2){
    var glasnaya;
    str3='';

    for(i=0;i<str2.length;i++){
        glasnaya=false;
        for(j=0;j<vowels.length;j++){
            if(str2[i]==vowels[j]){
                str3+=str2[i].fontcolor('red');
                glasnaya=true;
            }
        }
        if(glasnaya==false){
            str3+=str2[i];
        }
    }
    return str3;
}



/*---------------------Конец функция нахождения гласных букв------------------------------*/

/*-----------------------Функция нахождения приставки-----------------------------------*/
function prist(str){
    str3='';
    var textprist = new Array();
    textprist= str.split(" ");
    for(i in textprist){ }

    for(i=0;i<textprist.length;i++){
        for(j=0;j<pristavka.length;j++){
            index = textprist[i].toLowerCase().indexOf(pristavka[j]);
            if(textprist[i].length!=pristavka[j].length && index!=-1 && index==0 &&textprist[i].length>3) {
                stroka='<span>'+textprist[i].substring(0, pristavka[j].length).bold()+'</span>'+textprist[i].substr(pristavka[j].length);
                textprist[i]=stroka;
                break;
            }
        }
        str3+=textprist[i]+" ";
    }
}
/*---------------------Конец функция нахождения гласных букв------------------------------*/

/*Функция нахождения согласных букв*/
function soglBukv(str2) {
    //alert("Функция нахождения согласных букв");
    var soglasnaya;
    str3 = '';

    for(i=0;i<str2.length;i++){
        soglasnaya=true;
        if(isNaN(str2[i])==true){
            k=0;
            while(k<znak.length){
                k++;
                if(str2[i]==znak[k]){
                    str3+=str2[i];
                    soglasnaya=false;
                    break;
                }
            }

        } else {
            str3+=str2[i];
            continue;
        }

        if(soglasnaya==false) continue;

        for(j=0;j<vowels.length;j++){

            if(str2[i]==vowels[j]){
                soglasnaya = false;
                str3+=str2[i];
                break;
            }
        }
        if(soglasnaya==true) str3+=str2[i].fontcolor('blue');

    }

}
/*Конец функции нахождения согласных букв*/

/*-----------------------------Функция разбивания слов на слоги---------------------------------*/
function slogi(str2){

    str3 = '';
    tire='-'.bold().fontcolor('green').fontsize(5);
    // str = text.value;
    var textslog = new Array();
    textslog= str2.split(" ");
    for(i in textslog){ }
    for(i=0;i<textslog.length;i++){
        razmer=textslog[i].length-1; //количество символов в слове
        for(j=0;j<textslog[i].length;j++){
            str3+=textslog[i][j];

            for(z=0;z<vowels.length;z++){
                rav=true;
                if(textslog[i][j]==vowels[z] &&  j<(razmer-1)){

                    for(r=0;r<vowels.length;r++){
                        if(textslog[i][j+1]==vowels[r]){
                            rav=false;
                            l=0;
                            str3+=tire;

                            break;
                        }
                    }
                    if(rav!=false) {
                        glas=0;
                        b=0;
                        do {
                            if(textslog[i][j+2]==vowels[b]){
                                glas=1;
                                break;
                            }
                            b++;
                        }while(b<vowels.length);


                        if(glas==1){
                            str3+=tire;
                            break;
                        }else {

                            if(textslog[i][j+2]=='ь'||textslog[i][j+2]=='ъ'){
                                str3+=textslog[i][j+1]+textslog[i][j+2]+tire;
                                j=j+2;
                                break;
                            } else {
                                str3+=textslog[i][j+1]+tire;
                                j=j+1;
                                break;
                            }

                        }




                    }

                }

            }

        }
        str3+=' ';
    }





}
/*------------------------------Функция разбивания слов на слоги--------------------------------*/



function textClick(i){
    m=0;//чтобы при повторном нажатии не складывать значение с предыдущим
    text=str.value;
    str2= text.trim(" ");
    switch(i){
        case 1: {
            //Считаю количество слов
            kolSlov(str2);
            //Вывод информации о количестве слов
            str3=str2+"<br><br>Количество слов: "+array.length;
            changeText.innerHTML = str3;
            break;
        }
        case 2: {
            //Нахожу гласные
            glasBukv(str2);
            changeText.innerHTML = str3;
            break;
        }
        case 3: {
            //Нахожу согласные
            soglBukv(str2);
            changeText.innerHTML = str3;
            break;
        }
        case 4: {
            //Разбиваю на слоги
            slogi(str2);
            changeText.innerHTML = str3;
            break;
        }
        case 5: {
            //Выделяю приставку
            prist(str2);
            changeText.innerHTML = str3;
            break;
        }
    }
}
