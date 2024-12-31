#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    int secretNumber, guess, attempts = 0;
    char playAgain;

    // Khởi tạo bộ sinh số ngẫu nhiên
    srand(time(0));

    do {
        secretNumber = rand() % 100 + 1; // Số ngẫu nhiên từ 1 đến 100
        attempts = 0;

        printf("Chao mung ban den voi tro choi doan so!\n");
        printf("May tinh se random cac so tu 1 - 100. Ban doan xem lan iep theo la so nao.\n");

        do {
            printf("Nhap so ban doan: ");
            scanf("%d", &guess);
            attempts++;

            if (guess < secretNumber) {
                printf("So ban doan nho hon so bi mat, hay thu lai!\n");
            } else if (guess > secretNumber) {
                printf("So ban doan lon hon so bi mat, hay thu lai!\n");
            } else {
                printf("Chuc mung ban da doan dung so %d sau %d lan thu\n", secretNumber, attempts);
            }
        } while (guess != secretNumber);

        printf("Ban co muon thu lai khong? (y/n): ");
        scanf(" %c", &playAgain);

    } while (playAgain == 'y' || playAgain == 'Y');

    printf("Cam on ban da choi tro choi, hen gap lai!\n");

    return 0;
}
