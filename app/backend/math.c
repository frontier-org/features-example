#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    if (argc < 3) {
        printf("Error: Please provide two numbers.");
        return 1;
    }

    int a = atoi(argv[1]);
    int b = atoi(argv[2]);

    printf("--- NATIVE (C) ---\n");
    printf("Sum: %d\n", a + b);
    printf("Multiplication: %d\n", a * b);
    printf("Memory used: Minimum (C Stack)\n");
    
    return 0;
}
