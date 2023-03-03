import React, { useState, useEffect } from "react";
import sha1 from "sha1";
import axios from "axios";


export const Haveibeenpwned = ({ password }) => {
    const [hashNum, setHashNum] = useState()
    console.log({ password });
    var passhash = sha1(password);
    var link = `https://api.pwnedpasswords.com/range/`+passhash.slice(0, 5);

    useEffect(() => {
      returnNumber()
    }, [password])

    const returnNumber = () => {
        axios.get(link)
        .then((response) => {
            var hashes = {}
            var rows = response.data.split('\n');
            for (var row in rows) {
                var hashdata = rows[row].split(':');
                hashes[hashdata[0]] = hashdata[1];
            }
            var hashsuffix = passhash.slice(5, 40).toUpperCase();
            var found = hashes[hashsuffix];
            console.log(found);
            if (found) {
              setHashNum(found)
            } else {
              setHashNum(0)
            }
        });
    }

    if (hashNum == 0 && password !==""){
        return (
          <div>
            <h5 className='text-center my-2 text-success'>Your password has not appeared in data breaches before!</h5>
          </div>
        )
    }else if(hashNum > 0 ) {
        return (
            <div>
              <h5 className='text-center my-2 text-danger'>Your password has appeared <strong>{hashNum}</strong> times in data breaches before!</h5>
            </div>
        )
    }
    else{
        return(
            <div>
                <h5 className='text-center my-2'>Try typing a password and see how many types it has appeared in data breaches!</h5>
            </div>
        )
    }
};

export default Haveibeenpwned;