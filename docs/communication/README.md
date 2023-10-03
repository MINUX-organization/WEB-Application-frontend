# Static information
## System information
### Request
```json
{
  // Unique ID of request
  "request_id": "ea041520-8507-42c6-bf6e-6b317610c7fa",
  // Unique ID of response
  "resoponse_id": null,
  // Command
  "command": "get_system_info",
  "payload": {
    // Need GPU info?
    "gpu": true,
    // Need CPU info?
    "cpu": true,
    // Need motherboard info?
    "motherboard": false,
    "harddrive": true,
    "ram": true
  }
}
```

### Response
```json
{
  "type": "static",
  // Command
  "command": "get_system_info",
  // Unique ID of request
  "response_id": "021faac7-e9b0-4d41-a55d-ec815013d907",
  // Unique ID of response
  "request_id": "ea041520-8507-42c6-bf6e-6b317610c7fa",
  "payload": {
    // Array of all GPUs
    "gpu": [
      {
        "uuid": "jfsdkjf230423", // Generated unique id to each GPU by developer (to communicate with GPU)
        "information": {
          "manufacturer": "Nvidia",
          "periphery": "RTX 3080 Ti",
          "driver-version": "515.76",
          "cuda-version": "11.7",
          "gpu-uuid": "GPU-87111c58-594e-494c-a574-6c9b130a6170",
          "product-architecture": "Ampere",
          "serial-number": null,
          "vbios-version": "94.06.25.00.7e",
          "pci": {
            "bus": "0x0b",
            "device-id": "0x250410de",
            "bus-id": "00000000:0b:00.0"
          }
        },
        "temperature-celsius": {
          "max-operating": "93", // necessary
          "memory-max": null // necessary
        },
        "memory-mb": {
          "total": "12288", // necessary
        },
        "power-watt": {
          "default-limit": "170", // necessary. Maximum power limit of GPU (standard)
          "enforced-limit": "170", // by user
        },
        "clocks-mhz": {
          "max-graphics": "2100", // necessary
          "max-sm": "2100", // necessary
          "max-memory": "7501", // necessary
          "max-video": "1950" // necessary
        }
      },
      ...
    ],
    "cpu": {
      "information": {
        "manufacturer": "Intel",
        "model-name": "i3-7100",
        "architecture": "x86_64",
        "op-modes": "32-bit, 64-bit",
        "cores": {
          "cpus": "4",
          "threads-per-core": "2",
          "threads-per-socket": "2",
          "sockets": "1"
        }
      },
      "clocks-mhz": {
        "max": "3900.0",
        "min": "800.0"
      }
    },
    "motherboard": {
      "information": {
        "manufacturer": "ASUSTeK COMPUTER INC.",
        "product-name": "B250 MINING EXPERT",
        "serial-number": "180118537208105"
      }
    },
    "harddrive": [
      {
        "uuid": "sdkfjk34",
        "information": {
          "description": "string",
          "product": "string",
          "vendor": "string",
          "bus_info": "string",
          "logical_name": "string",
          "serial": "string",
          "width": "string",
          "clock-mhz": "44",
        },
        "capacity-b": "256"
      },
      ...
    ],
    "ram": [
      {
        "uuid": "qweroiu54",
        "information": {
          "total-width-b": "64",
          "data-width-b": "64",
          "size-gb": "4",
          "form-factor": "DIMM",
          "type": "DDR4",
          "memory-speed-mts": "2400", // 2400 MT/s
          "manufacturer": "09DF",
          "serial-number": "009C7049",
          "configured-memory-speed-mts": "2400",
          "configured-voltage-v": "1.2"
        }
      },
      ...
    ]
  }
}
```

## Get dynamic information
```json
{
  "type": "dynamic",
  "gpu": [
    {
      "uuid": "fsdkfj324",
      "temperature-celcius": 45,
      "fan-speed-percentage": 60,
      "hashrate-mg": 1000,
      "power-usage": 170,
      "algorithm": "Random X",
      "cryptocurrency": "XMR",
      "memory-mb": {
        "reserved": 235,
        "used": 7,
        "free": 12045               
      },
      "clocks-mhz": {
        "graphics": 210,
        "sm": 210,
        "memory": 405,
        "video": 555,
      },
      "voltage-mv": {
        "graphics": 681.250
      }
    }
  ],
  "cpu": {
    "temperature-celcius": 40,
    "fan-speed-percentage": 60,
    "hashrate-mg": 400,
    "power-usage": 100,
    "algorithm": "Random X",
    "cryptocurrency": "XMR",
    "cores": [
      {
        "temperature": 45,
        "usr-percentage": 0.04,
        "nice-percentage": 0.00,
        "sys-percentage": 0.11,
        "iowait-percentage": 0.06,
        "irg-percentage": 0.02,
        "soft-percentage": 0.02,
        "steal-percentage": 0.00,
        "guest-percentage": 0.00,
        "gnice-percentage": 0.00,
        "idle-percentage": 99.75
      },
      ...
    ]
  },
  "harddrive": [
    {
      "uuid": "rwerkj432",
      "temperature-celcius": 25, // -1 if hdd is sleeping
      "capacity-b": 256,
      "available-b": 256,
      "free-b": 256
    },
    ...
  ],
  "ram": [
    {
      "uuid": "fsdkj",
      "total-b": 256,
      "available-b": 256,
      "free-b": 256,
      "used-b": 256
    },
    ...
  ]
}
```
# Dynamic information
