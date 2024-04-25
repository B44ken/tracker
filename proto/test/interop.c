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

void track_double(double* value, char* name) {
    trackable* t = malloc(sizeof(trackable));
    t->name = name;
    t->type = "float64";
    t->value = value;
    tracking[num_tracking] = t;
    num_tracking++;
}

void track_int(int* value, char* name) {
    trackable* t = malloc(sizeof(trackable));
    t->name = name;
    t->type = "int32";
    t->value = value;
    tracking[num_tracking] = t;
    num_tracking++;
}

void tracker_report_entry(trackable* t) {
    char* json = malloc(128);
    // sprintf(json, "  {\"name\": \"%s\", \"typeof\": \"%s\", \"value\": %f}", t->name, t->type, *(double*)t->value);
    if(strcmp(t->type, "float64") == 0) {
        sprintf(json, "  {\"name\": \"%s\", \"typeof\": \"%s\", \"value\": %f}", t->name, t->type, *(double*)t->value);
    } else if(strcmp(t->type, "int32") == 0) {
        sprintf(json, "  {\"name\": \"%s\", \"typeof\": \"%s\", \"value\": %d}", t->name, t->type, *(int*)t->value);
    }
    printf("%s", json);
}

void tracker_report() {
    while(1) {
        printf("{TRACKER START}\n[\n");
        for(int i = 0; i < num_tracking; i++) {
            tracker_report_entry(tracking[i]);
            if(i != num_tracking - 1)
                printf(",\n");
        }
        printf("\n]\n{TRACKER END}\n");
        usleep(tracker_report_interval * 1000000);
    }
}

void tracker_init() {
    pthread_t thread;
    pthread_create(&thread, NULL, tracker_report, NULL);
}