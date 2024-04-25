package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
)

type tracker_value struct {
	Typeof string
	Name   string
	Value  interface{}
}

func print_values(val tracker_value) {
	if val.Typeof == "float64" {
		fmt.Println(val.Name, "=", val.Value.(float64))
	}
}

func tracker_loop(file_name string) {
	file_obj, err := os.Open(file_name)
	if err != nil {
		panic(err)
	}
	file := bufio.NewReader(file_obj)
	tracker_packet := ""
	is_tracking := false
	values := make([]tracker_value, 0)
	for {
		line, err := file.ReadString('\n')
		if err != nil {
			if err.Error() != "EOF" {
				panic(err)
			}
		}
		if len(line) > 0 {
			line = line[:len(line)-1]
		}
		if line == "{TRACKER START}" {
			tracker_packet = ""
			is_tracking = true
		} else if line == "{TRACKER END}" {
			is_tracking = false
			err := json.Unmarshal([]byte(tracker_packet), &values)
			if err != nil {
				fmt.Println("Error parsing JSON")
			}
			for _, value := range values {
				print_values(value)
			}
		} else {
			if is_tracking {
				tracker_packet += line
			} else {
			}
			if line == "{TRACKER QUIT}" {
				break
			}
		}
		if file.Buffered() == 0 {
			break
		}
	}
}

func main() {
	tracker_loop("/")
}
