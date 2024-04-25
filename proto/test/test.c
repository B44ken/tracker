#include <unistd.h>
#include "interop.h"

int main() {
    tracker_init();
    double pi = 0;
    track(&pi, "pi");
    for(int i = 0; ; i++) {
        double sign = (i % 2) ? -1.0 : 1.0;
        pi += 4.0 / (2.0 * i + 1.0) * sign;
    }
}