import java.util.Scanner;


    public class Main {


        public static void main(String[] args) {

            Scanner in= new Scanner(System.in);

            int choise=0;
            while (choise<3) {
                System.out.println("");
                System.out.println("To select a rectangle, press 1. To select a triangle, press 2. To exit the program, press 3");
                choise = in.nextInt();
                switch (choise) {
                    case 1:
                        rectangle();
                        break;
                    case 2:
                        triangle();
                        break;

                }
                if (choise == 3) {
                    System.out.println("Request to end the program");
                    break;
                }
            }
        }
        public static void rectangle(){
            Scanner in = new Scanner(System.in);
            int length=0; int width=0; int hekef=0;
            System.out.println("Enter length and width");
            length=in.nextInt();
            width=in.nextInt();

            while (length<2){

                System.out.println("The length is less than two. It must be 2 or more!");
                length=in.nextInt();

            }
            while (width<=0){
                System.out.println("The width is less than zero. Please enter a positive number!");
                width=in.nextInt();
            }

            if(width==length||(Math.abs(length-width)>5))
                System.out.println("Area of the rectangle:"+length*width);
            else
                hekef=(length*2)+(width*2);
                System.out.println("The perimeter of the rectangle:"+ hekef);



        }
        public static void triangle() {
            Scanner in = new Scanner(System.in);
            int gova=0; int rochav=0;
            System.out.println("Enter gova and rochav");

            gova=in.nextInt();
            rochav=in.nextInt();

            while (gova<2){

                System.out.println("The length  less than two. It must be 2 or more!");
                gova=in.nextInt();

            }
            while (rochav<=0){
                System.out.println("The width is less than zero. Please enter a positive number!");
                rochav=in.nextInt();
            }

            System.out.println("To calculate the perimeter of the triangle, press 1. To print the triangle, press 2");
            int choose=in.nextInt();
            switch (choose){
                case 1:
                    int half=rochav/2;
                    int tzela=gova*gova+half*half;
                    int hekef= (int) Math.sqrt(tzela)+(int) Math.sqrt(tzela)+rochav;
                    System.out.println("The perimeter of the triangle:"+hekef );
                    break;
                case 2:
                    print(gova,rochav);
                    break;
            }
        }

        public static void print(int gova,int rochav){
            int count=1; int mode=0; int line=0; int mid=0;
            mid = gova-2;

            if(rochav%2==0||(rochav/2)>gova)
                System.out.println("It can't be!!");
            else {

                for (int i = 3; i < rochav; i++) {
                    if (i % 2 != 0)
                        count++;
                }

                mode = mid % count;
                line = mid / count;
                printStars(count, mode, line, rochav);
            }
        }
        public static void printStars(int count, int mode, int line,int rochav){
            int star=1;
            printSpaces(rochav,star);
            System.out.println("*");

            for(int i=1;i<=count;i++){
                if (rochav > 3)
                star+=2;
                if(i==1){
                    for(int j=0;j<mode+line;j++){
                        printSpaces(rochav,star);

                        for(int k=0;k<star;k++) {
                            System.out.print("*");
                        }
                        System.out.println();
                    }


                }
                else{
                    for(int j=0;j<line;j++) {
                        printSpaces(rochav,star);
                        for(int k=0;k<star;k++) {

                            System.out.print("*");
                        }
                        System.out.println();
                    }
                }
            }
            for(int l=0;l<rochav;l++)
                System.out.print("*");
        }
        public static void printSpaces(int rochav, int star){

            int hef = (rochav-star)/2;
            for(int i=0;i<hef;i++){
                System.out.print(" ");
            }
        }

    }





