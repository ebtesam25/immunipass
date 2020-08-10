//#include <I2C.h>

#include <sps30.h>
#include <dht.h>


#define dht_apin A0 // Analog Pin sensor is connected to
#define voc_pin A2
 
dht DHT;
int voc;

// Example arduino sketch, based on 
// https://github.com/Sensirion/embedded-sps/blob/master/sps30-i2c/sps30_example_usage.c


// uncomment the next line to use the serial plotter
// #define PLOTTER_FORMAT

void setup() {
  voc = 0;
  s16 ret;
  u8 auto_clean_days = 4;
  u32 auto_clean;

  Serial.begin(115200);
  delay(3000);
  
  while (sps30_probe() != 0) {
    Serial.print("SPS sensor probing failed\n");
    delay(500);
  }

#ifndef PLOTTER_FORMAT
  Serial.print("SPS sensor probing successful\n");
#endif /* PLOTTER_FORMAT */

  ret = sps30_set_fan_auto_cleaning_interval_days(auto_clean_days);
  if (ret) {
    Serial.print("error setting the auto-clean interval: ");
    Serial.println(ret);
  }
    
  ret = sps30_start_measurement();
  if (ret < 0) {
    Serial.print("error starting measurement\n");
  }

#ifndef PLOTTER_FORMAT
  Serial.print("measurements started\n");
#endif /* PLOTTER_FORMAT */
  delay(1000);
}

void loop() {
  struct sps30_measurement m;
  char serial[SPS_MAX_SERIAL_LEN];
  u16 data_ready;
  s16 ret;

  do {
    ret = sps30_read_data_ready(&data_ready);
    if (ret < 0) {
      Serial.print("error reading data-ready flag: ");
      Serial.println(ret);
    } else if (!data_ready)
      Serial.print("data not ready, no new measurement available\n");
    else
      break;
    delay(100); /* retry in 100ms */
  } while (1);

  ret = sps30_read_measurement(&m);
  if (ret < 0) {
    Serial.print("!!error reading measurement\n");
  } else {

#ifndef PLOTTER_FORMAT
    Serial.print("##PM  1.0: ");
    Serial.print(m.mc_1p0);
    Serial.print("#PM  2.5: ");
    Serial.print(m.mc_2p5);
    Serial.print("#PM  4.0: ");
    Serial.print(m.mc_4p0);
    Serial.print("#PM 10.0: ");
    Serial.print(m.mc_10p0);

    Serial.print("#NC  0.5: ");
    Serial.print(m.nc_0p5);
    Serial.print("#NC  1.0: ");
    Serial.print(m.nc_1p0);
    Serial.print("#NC  2.5: ");
    Serial.print(m.nc_2p5);
    Serial.print("#NC  4.0: ");
    Serial.print(m.nc_4p0);
    Serial.print("#NC 10.0: ");
    Serial.print(m.nc_10p0);
   

    Serial.print("#Typical particle size: ");
    Serial.print(m.typical_particle_size);
    
    DHT.read11(dht_apin);
    Serial.print("#humidity :");
    Serial.print(DHT.humidity);
    //Serial.print("%  ");
    Serial.print("#temperature :");
    Serial.print(DHT.temperature); 
    voc = analogRead(voc_pin);
    Serial.print("#VOC :");
    Serial.print(voc);
    Serial.println("$$");
    
#else
    // since all values include particles smaller than X, if we want to create buckets we 
    // need to subtract the smaller particle count. 
    // This will create buckets (all values in micro meters):
    // - particles        <= 0,5
    // - particles > 0.5, <= 1
    // - particles > 1,   <= 2.5
    // - particles > 2.5, <= 4
    // - particles > 4,   <= 10
    
    Serial.print(m.nc_0p5);
    Serial.print(" ");
    Serial.print(m.nc_1p0  - m.nc_0p5);
    Serial.print(" ");
    Serial.print(m.nc_2p5  - m.nc_1p0);
    Serial.print(" ");
    Serial.print(m.nc_4p0  - m.nc_2p5);
    Serial.print(" ");
    Serial.print(m.nc_10p0 - m.nc_4p0);

    delay(3000);
    DHT.read11(dht_apin);
    Serial.print("#humidity :");
    Serial.print(DHT.humidity);
    //Serial.print("%  ");
    Serial.print("#temperature :");
    Serial.print(DHT.temperature); 
    voc = analogRead(voc_pin);
    Serial.print("#VOC :");
    Serial.print(voc);
    Serial.println("$$");


    
    Serial.println();


#endif /* PLOTTER_FORMAT */
    
  }
  delay(3000);
  delay(2000);
}
