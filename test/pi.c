#include <unistd.h>
#include "tracker.h"

int main() {
    tracker_init();

    double pi = 0;
    int i = 0;

    track_double(&pi, "pi");
    track_int(&i, "i");

    // leibniz series for pi
    for(i = 0; ; i++) {
        double sign = (i % 2) ? -1.0 : 1.0;
        pi += 4.0 / (2.0 * i + 1.0) * sign;
        usleep(1000); // sleep 1ms
    }
}