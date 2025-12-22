#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    if (argc < 3) {
        printf("Erro: Forneca dois numeros.");
        return 1;
    }

    int a = atoi(argv[1]);
    int b = atoi(argv[2]);

    printf("--- NATIVO (C) ---\n");
    printf("Soma: %d\n", a + b);
    printf("Multiplicacao: %d\n", a * b);
    printf("Memoria usada: Minima (Stack C)\n");
    
    return 0;
}