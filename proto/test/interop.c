#include <unistd.h>
#include <stdlib.h>
#include <pthread.h>
#include <stdio.h>

typedef struct {
    char* name;
    char* type;
    void* value;
} trackable;

const double tracker_report_interval = 1.0;

trackable* tracking[100];
int num_tracking = 0;

void track(double* value, char* name) {
    trackable* t = malloc(sizeof(trackable));
    t->name = name;
    t->type = "float64";
    t->value = value;
    tracking[num_tracking] = t;
    num_tracking++;
}

void track(int* value, char* name) {
    trackable* t = malloc(sizeof(trackable));
    t->name = name;
    t->type = "int";
    t->value = value;
    tracking[num_tracking] = t;
    num_tracking++;
}

void tracker_report_entry(trackable* t) {
    char* json = malloc(128);
    sprintf(json, "  {\"name\": \"%s\", \"typeof\": \"%s\", \"value\": %f}", t->name, t->type, *(double*)t->value);
    printf("%s\n", json);
}

void tracker_report() {
    while(1) {
        printf("{TRACKER START}\n[\n");
        for(int i = 0; i < num_tracking; i++) {
            tracker_report_entry(tracking[i]);
            if(i != num_tracking - 1)
                printf(",\n");
        }
        printf("]\n{TRACKER END}\n");
        usleep(tracker_report_interval * 1000000);
    }
}

void tracker_init() {
    pthread_t thread;
    pthread_create(&thread, NULL, tracker_report, NULL);
}