import React, { Component } from "react";
import { shoefyStakingAmount } from "../actions/smartActions/SmartActions";
import { CSVReader, CSVDownloader, jsonToCSV } from "react-papaparse";
import { Button } from "@material-ui/core";

const buttonRef = React.createRef();

export default class ShoefyWork extends Component {
  constructor(props) {
    super(props);
    this.state = { inputData: [], outputData: [], errorAddress: [] };
  }
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleOnFileLoad = (data) => {
    let finalData = data.map((singleData) => {
      return singleData.data[0];
    });
    this.setState({ inputData: finalData });
    console.log(finalData);
  };

  handleOnError = (err, file, inputElem, reason) => {};

  handleOnRemoveFile = (data) => {};

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };
  getHoldings = async () => {
    let data = [
      "0xcc522e350466dc71f1fbcd873ad5674135910769",
      "0xc771d2f0f04bbfc9f243fe12ece0c16055d6cd6b",
      "0x300a49c18fa853a154272edabb7bf94869767bc8",
      "0xfeedfe9c2acb949ef80b0fa714e282d66bd2f955",
      "0x2460503c8a42cf5622ecfd977d5bfe7156967aad",
      "0x2596b3898a19ac17d37ef56c01c5dc052832f7ed",
      "0x9bbca7f8d197cd7bb0da0a3664afd4d117813c47",
      "0xad528a3b79cc5100b3fd26a4c0e11ac100a764dc",
      "0xce87b2f60ed456356512e152ca4a34cf6619b2ce",
      "0x6b866cd375a281551897cbc5e24eecd3aea70993",
      "0x239a31e6bb3ae007f0737191421c2865f61d3036",
      "0xb4932fbf9260c3af71e9d65b5223c9114f7678f2",
      "0xc1441f7fb36173fb5b133d4858b074f31cf98839",
      "0x8a137187599a169b20107fbada4b17bf25c1d278",
      "0x7f8c6bc33e482dba5f2ba175cf1f3dde25406493",
      "0x3c16ea242b5b063d7840d99be1c08088a6307028",
      "0x7f8c6bc33e482dba5f2ba175cf1f3dde25406493",
      "0xf88c6f6b080d2a43743d34920d15d9232db40cb8",
      "0x3f851e4732aef7e9a937c75da74a38ff8e4c3b18",
      "0xcc33d826a33b47eeec6cea8ad5f4b8f69d4511da",
      "0x544ca06341830ed7f6473351d33ee7a42c2cfa76",
      "0xbeb72b567a4fe8f7419ce7a42fc0cfad315f2d22",
      "0x5862a5cbab3c17a5e1d8171a5a72638b5cd75cd4",
      "0x768263481c4703c22144558112d931b683492b52",
      "0x234eb7a72dc9bd46c8ef5d437c5f7bb4187edf02",
      "0x1f2186a35d4ec3152c573afed2754ada0c391d55",
      "0x96117462f846ddc8c7a7203180974701a28151e0",
      "0x946d47ceb29058d1e11578fc0cb41d924c03584d",
      "0x7bcf4e50a308ca1b6c71b4f5a6d5fef20e996164",
      "0xf9ff4b2dcec56e6c6756bacae17cf71ed606dbfb",
      "0xca22a87f2ee18ec83405056b4b3fbfcb2cd59cf7",
      "0xaea2db0cfb4b4e777175cd16b19100625dc51563",
      "0xbbe50f03585f0e44aac6bd7cb174520de72480ac",
      "0xa91654ac99833fb80a567b0d0ae177cbebe0fcce",
      "0xa2dcb52f5cf34a84a2ebfb7d937f7051ae4c697b",
      "0xeb5a7bd1b210df96e2d4a05a80ce5a2ad99fb81f",
      "0x41fab1cda25c5c15c5a0260537a6056ab62318cc",
      "0xab50b0e1b6ae9c5982c9ce34d2b080a3ff391e97",
      "0x0f8dfda2cc073a6160c03ca856bec0f376e54440",
      "0xf98049a664509c1fde7b30341f826e94a790f407",
      "0xe06039889343efb2bbd7386e874f3276ed5c2542",
      "0xea4f70624a37b811100f58658d79d6df2eea6254",
      "0x946d47ceb29058d1e11578fc0cb41d924c03584d",
      "0x7052ca9a83a7c1a84552385595db4ae7d376a6df",
      "0x1d3f704d84e1b6228b685e9eecabc043dcde9007",
      "0xd9fe94c8a0a9159d52683074a63acbf5fff1e379",
      "0xee9ca24fb62bfc021e1a46e09e1c1cbecd3341b5",
      "0xad40c03bb051fd167af830bf2560122ea1299284",
      "0xed694315a7a63ce2283630c2be5083182040d0ba",
      "0xe6ff60b9d1191a6fb4ad9057feba8e1b33b2e5d3",
      "0x778c4938d2fdacd4679aa3c7029fcae60599248c",
      "0xcdd6564d9a70f6a4e74b9b4087131e140770f299",
      "0x03b1fd375a43967150fee3c92430a64f9d60aace",
      "0x7bcf4e50a308ca1b6c71b4f5a6d5fef20e996164",
      "0x7e9dadd8eadaf80f5572ee216b126c37f07c1c76",
      "0xcb936f879c767af49273e79a883b71e8667e7001",
      "0x9c7ee8595fdd864059601559f6bd8761f76335a5",
      "0xf56723e0bfcfc8e54b75c0b53b3661674eab3844",
      "0x968604577a144d6e8d1ee357f6422eb0a32a356a",
      "0x352e2f49e8e1922f85a81b95c593f6598d7302ea",
      "0x8f53007c39e97d1c0c347dc583d1f9f7ade2be96",
      "0x3fd451c8905c1dbc30f19f7a6a4d8a52a35bad38",
      "0x29d6d6d84c9662486198667b5a9fbda3e698b23f",
      "0xc1313e7a6e6b98de358add88df2b8890502bd775",
      "0xfc14f33d24797d5fe1ebbc1010dd4d14ea2fcbba",
      "0x080193a47a133d5c0ed0c0db40df774c58fed0d2",
      "0xa47f5dfb53f617cbce164f29b26273e9332631c4",
      "0x567d79941a8947bb6a318dea8e55835755e6fcb1",
      "0x6d75b5c51c41d5361f5729a2d453fee4ef40e652",
      "0xa57e1cefbfc9d13415fe818a51d55e01781d085a",
      "0x99cdfd0b9b254a9c09552f7a22bb6dd08d7c9ee3",
      "0x2b92a60faecc6ecb70334b3c2b15f0a507723123",
      "0x8dc993d3516c0a33b695ef48535496f94d6c8aa5",
      "0x9bb42653442988034216477d30db7df6bad65096",
      "0x93dab9c9c1eb273c6ef747b7e0c2cc0ca6f607dd",
      "0x720cabfe99401bccce9fc9b0c3bb86b612af4406",
      "0xd11edeb0cbea197c4388d6c83e9296b84cd368f2",
      "0x51c817377b6fe11a6c5d7b346fa05eb657ed9afa",
      "0x2443f245944e7333208b90b540a975da83893332",
      "0xcf30ad0218df3ae8c3635f0f9c7de8305c7414c0",
      "0xd53f0b61f6c4725ac2f8dd9568b89d63b1523c36",
      "0x81adfa0309a1629f68db6a6cff37a1fe68ffdd2a",
      "0xa7956b8eeb7a3838146f88bb32c7171cf4143345",
      "0xa10039abc04d165325c5eaf16cb4dbeff95254f0",
      "0x346b5dde730fb73276c7b685b4db8085c2d46e18",
      "0x1494e66817b0f065837d00c77f36d6d171af4a3e",
      "0x08df612dddbb66bfd5fad48feb225763065cd2d6",
      "0x5708df8c01d2bcec22dfa66c501e27c197ba2470",
      "0xb60c49b8bc7cf1d56c871d682118b0bbfb5b38ed",
      "0x8aa6fd940ecdc03c9721adbc5bc10210d6f449c5",
      "0xc89b5fe77e572101d5117952b3fdc0620f60daa3",
      "0xc6894835d5b306ef5169703413b88d9d0a2022e6",
      "0xddcd3092d2506910a4e69619d326d453a5935a54",
      "0x6343b307c288432bb9ad9003b4230b08b56b3b82",
      "0xc1d0c14dc4ebdffd3501119c294a14d4eeaf5fda",
      "0x732be24f7ec08d12b7cea42a8036841634ffa382",
      "0x352e2f49e8e1922f85a81b95c593f6598d7302ea",
      "0x78529a0a8f11b9e85ef90d9746b0e702f8c4cd29",
      "0x44c4d57eef094ce423d271b0f6aabcfe21c401f0",
      "0x2194026daa02ad801a7775078fcc95b53dc0f5e9",
      "0xac73a68023d6e4869512767f882e4e1c762008e2",
      "0x3ada82dccb6ba11f976930c330220a369a9f7efb",
      "0xf1c97e0253f8dba4f32387ec72f0ca874fbcb751",
      "0xec964b6c91abde8f583f744de48da87b9f43035e",
      "0x03b76647464cf57255f20289d2501417a5ec457e",
      "0x31386e4b622ad37db10246e32932dbf03b175354",
      "0xcd28042ec9d262f64b8e86a5d0bdb28e91f0ace2",
      "0x7aa9fc5ccb0febdcbc832f8b26e9b7351d29a853",
      "0x7ac0ba405b7cb03fbd6cfa7ca7f0ae43419cdd18",
      "0x17818cd9ea33d72257b7125c5d4fe3f01614c489",
      "0x0306cd016809328c17b9a6cdaf6ed63a4316aa58",
      "0xe3000236977bdb249eb286676479931d7419fa76",
      "0x3fd451c8905c1dbc30f19f7a6a4d8a52a35bad38",
      "0x258f40e0a685d5c780f32e68aa42624ce2b2833a",
      "0x24082d45d9d6ea1cafa6b1f8539f09aacd72d0d8",
      "0x3d999903472efdfc3bb8dc18075de93bd8f7c8bd",
      "0xebf2c27ebf3064a214698aa42a2ed2410636ac10",
      "0x6ff520e4a45bbfd0978be2cc2611f9504229f670",
      "0xb1d243baf2ff20732941049deddb409f909ef5ec",
      "0xa663a2d0b5bc2ea6ba8d73d111f81d58ee2e136b",
      "0x176e2042a510d00aa69aa02e5f24d438cc6d8ab2",
      "0x22ffb5353d9ad7c4ee16c805733786341409fb4d",
      "0x20a3497417e6e3198a9559f5057d6e91be5b9fb6",
      "0x492a626a9a77d658e4160ebcc3b1cec4eef84519",
      "0x1bebf0e2c487bf6db1703145f0bba42f528d48cd",
      "0x08ec9c09915c356121c62dd566016ea50090c3b3",
      "0x328460c53c617008aac9127446e6912bbe222222",
      "0xad40c03bb051fd167af830bf2560122ea1299284",
      "0xde734917930fab98be2abb7aff8d630bb28d6c19",
      "0xbb6c8c542580d5b1e22d70dd18ed8812f4a874f1",
      "0x111b46246ba9bf46ef15dca39ab7775897271951",
      "0xaed3d37b761bf61767208da1dbb3a971b9f13fb5",
      "0x08ec9c09915c356121c62dd566016ea50090c3b3",
      "0x3c030948ecaede3fe2823b2ba6c0493970599fb6",
      "0xc15492775d881656d996663c95daa93d0ab2a93f",
      "0xfc999960e9295e791b3f1e208a56ec2e07c46bcd",
      "0x59093f8d3a95d42bdd6257488c3623ffd64afaf9",
      "0x6e1ca1e6279ec6806c098069f30cce893917c246",
      "0xc1cad6df277106222dd45cf5b0300fbd4d1193d5",
      "0xadcc784e3d6c7c37521c30dbcd48502e83bc82d7",
      "0x1fe91f0b8b4cca9418d31ec7c0bdd7989bb9c2fe",
      "0x177b5f17061067dbbdca7fab17b1deb9ef35d34a",
      "0xdafce11e734a9d7e9155fcaa6737f4e567b64a09",
      "0xc78e7731da04aa6e6ce730cca7aae517523f49df",
      "0xee9ca24fb62bfc021e1a46e09e1c1cbecd3341b5",
      "0xf59f5ef26d1c6fbb55c114f753f0dbbf644d3d9b",
      "0x1748aeebf0837f5749863a11f4d8730408b08bb3",
      "0xbc627254fa9e73117cb70e1d4eed610ba0a9de0d",
      "0x32e0ecc968d1e68a5042014741dcb5b156711f4d",
      "0x54735928123e3323753f7933782cd4ae3979389a",
      "0xc6b0f7e747c23f65e1f99617b379fe69b56cee32",
      "0x0a2162862af15266f06a020c4eb00158a3dfdb43",
      "0x4ea000fef56563a9c1d1834147840cf404b26b04",
      "0xf263b00ef4fd46589b27a61611ce854f645162fd",
      "0x452cc2fa5cd3598767dd3bf1ce57476c88524340",
      "0xe54c2e4052c64f072bbd03623b70f00b55dce915",
      "0x32371b624fad61fcc122813ac42ec6f8639f7fb4",
      "0xd65dd88f9148e567e73f0d3d72b6d3636a61f983",
      "0x6d894b6c4a1d857bffbf111ba65aa53a2e5dc027",
      "0x3c8b02b5b18e7c6ae87876cb94e1d273a04fbfe9",
      "0x48a38ffa2596d10a8cc382662b3faf56a5f31930",
      "0xfc4fc31a318916ca5f2d6281d0a373961306f240",
      "0xb1d243baf2ff20732941049deddb409f909ef5ec",
      "0x4129698faaf652eae8d5e3214746a8a04984465f",
      "0x6d4996ee23d427494a457523acfeacfcf5e6513b",
      "0xe53166f4d724236b4235a9bacef0e425d9f13956",
      "0x7359539c8302d843d37bd97e109b04b1d7689049",
      "0x79393f6cad0f64e7601f52e36f249971df37bbf7",
      "0xc082477e5fa4d360613f4723e3b6add536a4377c",
      "0x6a27f172aa6e4a54bace8001185959124edf45a7",
      "0x705cb42351f3b54b1089fe548c99476265473f21",
      "0xd5345e8767f587986d464c913e26108d4e1bd000",
      "0xc63dad3ecce7b78a0155b1e0786eda19a15c82a8",
      "0xbab2d91588103231cdbdccbdc5df669fcb6e1b7e",
      "0x222a5ab020a462b0c0f1aaba1ee940c1aa84dbac",
      "0x6c18d6deb8094ef05852d14eaf5de3da8c64a42e",
      "0x9dd561747b6f8b6b12217ed4e680d598f0ff9302",
      "0x91a6ebd9fa4da694a652eb4f62ead38a65a9d525",
      "0x9bad2f2c153ed24ae7399cdc94ed6964e3e305fd",
      "0x57a36e40a540fb1744cc30d47d2c7e5888110c5d",
      "0x1c0a31fe38a25abae792012701204160316029ee",
      "0xe7736944eb074bd0708a6d02f4a4961c032c072d",
      "0x13958f540111caa602d187a5001686ddf2306ff9",
      "0xe8a8ffc888a4c078b09974ed0af9bee1ececc056",
      "0x0983515fd588ae32c41eeaea8f9c59e27d50e01b",
      "0xb27d30f77b9896d5d2be90d9ba4b2a4469d6d107",
      "0x3d54cbc4c76a2ba2921bfdff4ab540f5e4e5fae6",
      "0xc9b2dd32f52cac65c750d11cbebf74f1c04ce68e",
      "0xb5864318350282c59e4a5b7277c556acc872ee51",
      "0x205ffda46164c3e6ae60af559c82f26f9470072e",
      "0x36e166e665fa39a1cf7fa26eb2f37ec86c84d24c",
      "0x109ff457b72d6e8beb5fd59fb5fc85864022370c",
      "0x295c4df976c84bc378ee2fe8fba7bfbe1541d225",
      "0x8452e3050f79c39f09e058c134df39dc94d8ca46",
      "0xc1cad6df277106222dd45cf5b0300fbd4d1193d5",
      "0x23813458252830c9d7f15ad96fc837f388533bfa",
      "0xa1d6e6869f16fb487633e09c114b211a901d5a81",
      "0xe816c2932724655782a81009cab64bc45446afb0",
      "0x8f81e45f8b58cc6b713df0bcdd8ba352426d7f91",
      "0x95e7da5f75cfc8c86e300eb8053e1ff939445532",
      "0xd4fed462051ca35b504c6d7fdedcff5d6a2d4e22",
      "0x346a6316e26c4de91214e231265bef0ed7cbb4e1",
      "0x8d1dd5e79b4ffd792d632eefa3eb5c1d10266907",
      "0x8f81e45f8b58cc6b713df0bcdd8ba352426d7f91",
      "0x58bdc3296a4aca9c3eb9b116bebdd30518ed1d35",
      "0xa2dcb52f5cf34a84a2ebfb7d937f7051ae4c697b",
      "0x434d20f4286711530e945957f77384649c5301a7",
      "0x74931a63f678581234ebc535724517778084fddd",
      "0xa3b9a82257c93408966acf43c3715f8e72a9d854",
      "0x0b646106e3a44e9ef046711bf6054bcde987bce6",
      "0x3d999903472efdfc3bb8dc18075de93bd8f7c8bd",
      "0x626937003a427edf61021f5b657b5f64375ebb62",
      "0x83099b68be7c7f941fc4771fc21af619bf0bd012",
      "0x5e9c49d9c95e79f853fd6cf8b6065b3995c9b10c",
      "0x5a89e238c4c30d9ff935cce6adcdcc9bbc153403",
      "0x3afaf623d1019cc32a98fc9e3ee36c7b8df3c578",
      "0x3afaf623d1019cc32a98fc9e3ee36c7b8df3c578",
      "0x5a89e238c4c30d9ff935cce6adcdcc9bbc153403",
      "0x3b3f6f4852cf251a99580239a4cab6fbbedea03e",
      "0x2e9f5cf450f75fb03c4a9819c71d03943324ce9b",
      "0xf09e7eb89e73c8eea8ba12950ca0cdf0db2cc2ab",
      "0x109ff457b72d6e8beb5fd59fb5fc85864022370c",
      "0x109ff457b72d6e8beb5fd59fb5fc85864022370c",
      "0x30b38511086bcb20e974e138dae5eb3f54d1da64",
      "0x8b7de9d383d31c27b3ccb6bfc748f324202c122d",
      "0x148afbce5ce5417e966e92d2c04bd81d8cb0e04e",
      "0x4986ac8522e8831e71439c529e514022596c301b",
      "0x8b8fac8e98d668ac45106a7e2e81a7eabd080fcc",
      "0x11ad93a8d2c333a9a4994b0b6707aed8320d6304",
      "0xd1f36de682b60418377430f567426d5a64ab962e",
      "0xa4e3d1be71e1ff77ec9eecffa4254631c06b4fc4",
      "0xabeea224a28ae17d456b23ac86dbc4dd96c232c3",
      "0x72d27669acd636b33e8f704a4eead3d9f46a1fe4",
      "0xb868356cb5e6efb94cb64b391a246d6e992f8144",
      "0x98265a1ff213dd8136e0bf58c2c40cb47d2b8648",
      "0x4e2f395de08c11d28be37fb2f19f6f5869136567",
      "0x34d3e239d2a50c25940d179eb031da32ddf4bb13",
      "0xe0aea92f33ed65a4c2a15b8ab411a2987a364f45",
      "0x21e296e2ace204025ac5873bf21ef17a9fefa7f2",
      "0x1afa4da258c8338e4c964ebbdb86c3adcdb47815",
      "0x737d1be798efa2278fb46807b2ea3ec36397f5da",
      "0x894334d7cf9a3ffbfb273a07e8aa06a08c625473",
      "0x3d999903472efdfc3bb8dc18075de93bd8f7c8bd",
      "0x46c02c0c16cdfb2b1da16f42dab23860096cd63f",
      "0xe0aea92f33ed65a4c2a15b8ab411a2987a364f45",
      "0x40414a578f0e2d55b2302951996f48d67a748fb5",
      "0x109ff457b72d6e8beb5fd59fb5fc85864022370c",
      "0x91a6ebd9fa4da694a652eb4f62ead38a65a9d525",
      "0x6d52d78274a5ecbed86f89ceaede7c8b8d3c5618",
      "0x109ff457b72d6e8beb5fd59fb5fc85864022370c",
      "0xa00ca3fd1e62a19b07b3fb386496ea088755f2a9",
      "0x6d52d78274a5ecbed86f89ceaede7c8b8d3c5618",
      "0xa1d6e6869f16fb487633e09c114b211a901d5a81",
      "0xde434fb25aab30ab84a42c2ca5be3792ef79819a",
      "0x91a6ebd9fa4da694a652eb4f62ead38a65a9d525",
      "0x0678a0cfc4b8e749033e7b452ff19f7bc90d5ad4",
    ];

    data.map(async (singleAddress, index) => {
      setTimeout(async () => {
        let totalPBR = await shoefyStakingAmount(singleAddress.toString());
        console.log("index: " + index);
        if (totalPBR !== null && totalPBR !== undefined) {
          if (totalPBR >= 0) {
            let tempObject = {
              address: singleAddress,
              amount: totalPBR,
            };
            this.setState({
              outputData: [...this.state.outputData, tempObject],
            });
          } else {
            this.setState({
              errorAddress: [...this.state.errorAddress, singleAddress],
            });
          }
        } else {
          this.setState({
            errorAddress: [...this.state.errorAddress, singleAddress],
          });
        }
      }, index * 100);

      return 121;
    });
    console.log("Printing before");
  };

  render() {
    return (
      <div>
        {" "}
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          noClick
          noDrag
          onRemoveFile={this.handleOnRemoveFile}
        >
          {({ file }) => (
            <aside
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <button
                type="button"
                onClick={this.handleOpenDialog}
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  width: "40%",
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                Browse file
              </button>
              <div
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#ccc",
                  height: 45,
                  lineHeight: 2.5,
                  marginTop: 5,
                  marginBottom: 5,
                  paddingLeft: 13,
                  paddingTop: 3,
                  width: "60%",
                }}
              >
                {file && file.name}
              </div>
              <button
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                onClick={this.handleRemoveFile}
              >
                Remove
              </button>
            </aside>
          )}
        </CSVReader>
        <div className="text-center">
          {" "}
          <Button
            variant="contained"
            style={{ backgroundColor: "yellow" }}
            onClick={this.getHoldings}
          >
            Get Holding
          </Button>
        </div>
        <CSVDownloader
          filename={"kucoin_reward"}
          config={{
            download: true,
          }}
          data={() => {
            return this.state.outputData.map((singleRow, index) => {
              let final = {
                No: index + 1,
                Address: singleRow.address,
                Amount: singleRow.amount,
              };
              console.log(final);
              return final;
            });
          }}
        >
          Download
        </CSVDownloader>
      </div>
    );
  }
}
