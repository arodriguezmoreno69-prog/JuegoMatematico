import java.util.Scanner;

public class IngresarNombre {
    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);

        System.out.print("Ingrese su nombre: ");
        String nombre = entrada.nextLine();

        System.out.println("Hola, " + nombre + " 👋");

        entrada.close();
    }
}